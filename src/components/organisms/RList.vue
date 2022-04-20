<template>
  <div>
    <q-table
      class="my-sticky-dynamic sticky-actions-column full-height"
      :columns="schemaColumns"
      :loading="loadingListData"
      flat
      bordered
      :pagination.sync="pagination"
      :data="listData"
      @request="handleRequest"
      virtual-scroll
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-row="props" v-if="false">
        <td v-for="(col, indx) in props.cols" :key="'topRow_' + indx">
          <component
            v-if="col.name != 'actions'"
            :is="col.component || defaultFilterInputComponent"
            outlined
            dense
            v-bind="col.props"
            v-model="filterOptions[col.field]"
          />
          <div v-else>
            <q-btn
              icon="las la-filter"
              color="secondary"
              unelevated
              dense
              size="sm"
              @click="filterList"
            ></q-btn>
            <q-btn
              class="q-ml-sm"
              icon="las la-times-circle"
              color="negative"
              unelevated
              dense
              size="sm"
              @click="resetFilter"
            ></q-btn>
          </div>
        </td>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-badge
            v-if="props.col.isBadge && props.value"
            :color="props.col.badgeColor || 'secondary'"
            :label="props.value"
          />
          <q-img
            v-else-if="props.col.isImage"
            :src="props.row.image"
            :height="props.col.imageHeight || '25px'"
            fit="contain"
          />
          <span v-else-if="props.col.isDate">
            {{
              formatDate(
                props.value,
                props.col.dateMask || "DD/MM/YYYY HH:mm:ss"
              )
            }}
          </span>
          <span v-else>{{ props.value }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="{ row, col }">
        <q-td :class="`text-right sticky-position`">
          <div class="row" style="width: max-content">
            <q-btn
              class="edit-btn q-mr-md text-primary"
              dense
              flat
              color="primary"
              icon="o_edit"
              size="sm"
              @click="handleMenuItemClick('edit', row)"
            ></q-btn>

            <q-btn-dropdown
              color="primary"
              padding="4px 3px"
              dropdown-icon="o_more_vert"
              size="sm"
              no-icon-animation
              unelevated
            >
              <q-list>
                <div
                  v-for="(item, index) in col.actionOptions"
                  :key="'cAction_' + index"
                >
                  <q-item
                    v-if="
                      (typeof item.visible == 'boolean' && item.visible) ||
                      (typeof item.visible == 'function' && item.visible(row))
                    "
                    clickable
                    v-close-popup
                    @click.prevent="handleCustomAction(item, row)"
                  >
                    <q-item-section>
                      <q-item-label>{{ item.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <q-item
                  v-for="(item, index) in actions"
                  :key="'menuItem_' + index"
                  clickable
                  v-close-popup
                  @click.prevent="handleMenuItemClick(item.type, row)"
                >
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-td>
      </template>
    </q-table>
    <!-- <BlitzTable
      :schemaColumns="schemaColumns"
      :schemaGrid="schemaColumns"
      :rows="listData"
      :title="title"
      :flat="flat"
      :bordered="bordered"
    >
    </BlitzTable>-->
  </div>
</template>

<script>
import { date } from "quasar";
const { formatDate } = date;
// import { BlitzTable } from 'blitzar'

export default {
  components: {
    // BlitzTable
  },
  props: {
    schemaColumns: {
      type: [Object, Array],
      required: true,
    },
    schemaGrid: {
      type: [Object, Array],
      required: true,
    },
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
    flat: {
      type: Boolean,
      default: true,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    resourceApi: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      default: () => {
        return [
          { type: "edit", label: "Edit" },
          { type: "delete", label: "Delete" },
        ];
      },
    },
    slug: {
      type: String,
      required: true,
    },
    messages: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rowsPerPageOptions: {
      type: Array,
      default: () => [4, 10, 20, 30, 50],
    },
    defaultFilterInputComponent: {
      type: String,
      default: "QInput",
    },
  },
  data() {
    return {
      loadingListData: false,
      processing: false,
      listData: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      filterOptions: {},
      initialFilterOptions: {},
      formatDate,
    };
  },
  methods: {
    handleRequest(props) {
      let { page, rowsPerPage } = props.pagination;
      this.fetchListData(page - 1, rowsPerPage);
    },
    async fetchListData(page = 0, rowsPerPage = 10, type) {
      this.loadingListData = true;
      this.$loader.setLoading();
      if (this.listApi) {
        let params = {
          perPage: rowsPerPage,
          currentPage: page,
        };

        if (Object.keys(this.initialFilterOptions).length) {
          params.filter = this.initialFilterOptions;
        }
        if (type == "filter" && Object.keys(this.filterOptions).length) {
          params.filterParams = this.filterOptions;
        }
        try {
          const { data, limit, page, totalRecords } = await this.$axios.$get(
            this.listApi,
            params
          );
          this.listData = data;
          this.pagination.page = page;
          this.pagination.page++;
          this.pagination.rowsPerPage = limit;
          this.pagination.rowsNumber = totalRecords;
        } catch (err) {
          this.$q.notify({
            type: "negative",
            message: "Error!",
            caption: err.error.message || "Table data could not be fetched",
          });
        } finally {
          this.loadingListData = false;
          this.$loader.setLoading(false);
        }
      }
    },
    handleMenuItemClick(type, row) {
      switch (type) {
        case "edit":
          this.$router.push(`${this.slug}/edit/${row.id}`);
          break;
        case "delete":
          this.showDeleteDialog(row.id);
          break;
        case "view":
          this.$router.push(`${this.slug}/view/${row.id}`);
          break;
        default:
          return;
      }
    },
    showDeleteDialog(id) {
      this.$q
        .dialog({
          title: "Confirm Delete?",
          message: "Are you sure you want to delete?",
          cancel: true,
          ok: {
            color: "negative",
          },
        })
        .onOk(async () => {
          await this.deleteRow(id);
          await this.fetchListData();
        });
    },
    async deleteRow(id) {
      this.processing = true;
      this.$loader.setLoading();
      await this.$axios
        .delete(`${this.resourceApi}/${id}`)
        .then((res) => {
          if (res) {
            this.$q.notify({
              type: "positive",
              message:
                this.messages.deleteSuccess ||
                res.message ||
                "Deleted Successfully",
            });
          }
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message:
              err && err.error
                ? err.error.message || "Error Occured"
                : "Cannot Delete",
          });
        });
      this.processing = false;
      this.$loader.setLoading(false);
    },
    handleCustomAction(item, props) {
      item.handler(this, props);
    },
    setFilterOptions() {
      const query = this.$route.query;
      let queries = Object.keys(query);
      if (query && queries.length) {
        queries.forEach((item) => {
          this.initialFilterOptions[item] = query[item];
        });
      } else {
        this.initialFilterOptions = {};
      }
    },
    filterList() {
      this.fetchListData(0, 10, "filter");
    },
    resetFilter() {
      this.filterOptions = {};
    },
  },
  mounted() {
    this.setFilterOptions();
    if (this.rows.length > 0 && this.resourceApi != "") {
      this.listData = this.rows;
    } else {
      this.fetchListData();
    }
  },
  computed: {
    listApi() {
      return `${this.resourceApi}/list`;
    },
  },
  watch: {
    "$route.query": async function (newVal) {
      this.setFilterOptions();
      this.fetchListData();
    },
  },
};
</script>

<style lang="sass">
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
    background: #f5f4f7

.edit-btn
  font-size: 24px
  cursor: pointer

.sticky-actions-column

  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */

  td:last-child
    background-color: #f5f4f7
    box-shadow: -2px 0px 4px #e2e2e2

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
    width: 150px


  .q-table th
    font-size:14px
</style>
