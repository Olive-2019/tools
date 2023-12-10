<template>
  <div id="divDMEEM554850">
    <div style="float: left; margin: 10px 10px 0" id="divDMEEM451377">
      <Button type="primary" style="margin: 5px 5px" @click="onClickImportButton" id="createExternalEntityButton">
        新建外部实体类
      </Button>
      <Button type="primary" style="margin: 5px 5px" @click="handleCustomSearch" id="handleCustomSearchButton">
        自定义查询
      </Button>
      <Modal
        v-model="importModal"
        :title="importModalState === 'importing' ? '新建外部实体类' : '编辑实体类'"
        id="createExternalEntityModal"
        width="75%"
        :mask-closable="false"
        @on-cancel="cancelImport"
      >
        <Spin fix v-show="importModalLoading" id="SpinDMEEM149256"></Spin>
        <Form ref="importExternalEntityForm" :model="externalEntityData" :rules="externalEntityValidate" inline id="FormDMEEM765596">
          <FormItem label="数据连接" prop="dataSourceOid" style="width: 23%;" id="FormItemDMEEM818118">
            <Select v-model="externalEntityData.dataSourceOid" placeholder="选择数据连接" @on-change="onChangeDataSource"
                    filterable clearable :disabled="importModalState==='editing'"
                    id="createExternalEntityModalDataSourceOid">
              <Option v-for="item in allDataSources" :value="item.oid" :key="item.oid" :label="item.dataSourceName" id="OptionDMEEM997974">
                {{ `${item.displayName ? item.displayName : ''}(${item.dataSourceName})` }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="Schema" prop="schema" style="width: 23%;" id="FormItemDMEEM800628">
            <Select v-model="externalEntityData.schema"
                    @on-change="onChangeSchema" filterable clearable :disabled="importModalState==='editing'" id="SelectDMEEM147127">
              <Option v-for="item in dbSchema" :value="item" :key="item" id="OptionDMEEM658723">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="数据库表" prop="zoneName" style="width: 23%;" id="FormItemDMEEM593155">
            <Select v-model="externalEntityData.zoneName" placeholder="选择数据库表"
                    @on-change="onChangeTable"
                    @on-clear="onClearTable"
                    filterable clearable :disabled="importModalState==='editing'"
                    id="createExternalEntityModalZoneName">
              <Option v-for="item in allTables" :value="item" :key="item" id="OptionDMEEM443441">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem v-if="reFitem" label="英文名" prop="className" style="width: 23%;" id="FormItemDMEEM019139">
            <Input v-model="externalEntityData.className" placeholder="输入英文名" :disabled="importModalState==='editing'"
                   id="createExternalEntityModalClassName"></Input>
          </FormItem>
          <FormItem v-if="reFitem" label="显示名" prop="displayName" style="width: 23%;" id="FormItemDMEEM685586">
            <Input v-model.trim="externalEntityData.displayName" placeholder="输入显示名"
                   id="createExternalEntityModalDisplayName"></Input>
          </FormItem>
          <FormItem label="主键" prop="primaryKey" style="width: 23%;" id="FormItemDMEEM653575">
            <Select v-model="externalEntityData.primaryKey" placeholder="选择主键列" filterable clearable
                    :disabled="(importModalState==='editing' && currentData.primaryKey !== undefined) || externalEntityData.zoneName === '' || externalEntityData.zoneName === undefined"
                    id="createExternalEntityModalPrimaryKey">
              <Option v-for="item in externalEntityKeyCols" :value="item.attributeName" :key="item.attributeName" id="OptionDMEEM893425">{{ item.attributeName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" prop="note" style="width: 46%;" id="FormItemDMEEM975551">
            <Input v-model="externalEntityData.note" type="textarea" placeholder="输入备注" id="input627309" :rows="1" :autosize="{maxRows: 5}"></Input>
          </FormItem>
        </Form>
        <Form id="FormDMEEM769546">
          <FormItem label="导入属性列" id="FormItemDMEEM160022">
            <Select v-model="selectedAttributes" filterable multiple
                    :disabled="externalEntityData.zoneName === '' || externalEntityData.zoneName === undefined"
                    @on-change="changeAttr" id="createExternalEntityModalSelectedAttributes">
              <Option v-for="(item,index) in externalEntityColsData" :value="item.attributeName" :key="index"
                      :label="item.attributeName" id="OptionDMEEM727697">{{ item.attributeName }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <Table
          id="createExternalEntityModalSelectedAttributesTable"
          border
          :columns="attrColumns"
          :data="externalEntityColsDataFiltered"
          size="small"></Table>
        <div slot="footer" id="divDMEEM862607">
          <Button type="text" size="large" :loading="false" @click="cancelImport" id="ButtonDMEEM206180">取消</Button>
          <Button type="primary" size="large" @click="confirmImport" id="confirmCreateExternalEntityButton">确认</Button>
        </div>
      </Modal>
      <Modal
        v-model="importEditModal"
        :title="'编辑实体类'"
        id="editExternalEntityModal"
        width="75%"
        :mask-closable="false"
        @on-cancel="cancelImport"
      >
        <Spin fix v-show="importModalLoading" id="SpinDMEEM302271"></Spin>
        <Form ref="editExternalEntityForm" :model="externalEntityData" :rules="externalEntityValidateEdit" inline id="FormDMEEM054518">
          <FormItem label="数据连接" prop="dataSourceOid" style="width: 23%;" id="FormItemDMEEM823978">
            <Select v-model="externalEntityData.dataSourceOid" placeholder="选择数据连接"
                    @on-change="onChangeDataSource" filterable :disabled="importModalState==='editing'"
                    id="editExternalEntityModalDataSourceOid">
              <Option v-for="item in allDataSources" :value="item.oid" :key="item.oid" :label="item.dataSourceName" id="OptionDMEEM898283">
                {{ item.dataSourceName }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="Schema" prop="schema" style="width: 23%;" id="FormItemDMEEM448688">
            <Select v-model="externalEntityData.schema"
                    @on-change="onChangeSchema" filterable :disabled="importModalState==='editing'" id="SelectDMEEM502126">
              <Option v-for="item in dbSchema" :value="item" :key="item" id="OptionDMEEM654629">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="数据库表" prop="zoneName" style="width: 23%;" id="FormItemDMEEM871890">
            <Select v-model="externalEntityData.zoneName" placeholder="选择数据库表"
                    @on-change="onChangeTable" filterable :disabled="importModalState==='editing'"
                    id="editExternalEntityModalZoneName">
              <Option :value="externalEntityData.zoneName" id="OptionDMEEM296993">{{ externalEntityData.zoneName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="英文名" prop="className" style="width: 23%;" id="FormItemDMEEM529170">
            <Input v-model="externalEntityData.className" placeholder="输入英文名" :disabled="importModalState==='editing'"
                   id="editExternalEntityModalClassName"></Input>
          </FormItem>
          <FormItem label="显示名" prop="displayName" style="width: 23%;" id="FormItemDMEEM065621">
            <Input v-model.trim="externalEntityData.displayName" placeholder="输入显示名"
                   id="editExternalEntityModalDisplayName"></Input>
          </FormItem>
          <FormItem label="主键" prop="primaryKey" style="width: 23%;" id="FormItemDMEEM914659">
            <Select v-model="externalEntityData.primaryKey" placeholder="选择主键列" filterable
                    :disabled="(importModalState==='editing' && currentData.primaryKey !== undefined) || externalEntityData.zoneName === '' || externalEntityData.zoneName === undefined"
                    id="editExternalEntityModalPrimaryKey">
              <Option v-for="item in externalEntityKeyCols" :value="item.attributeName" :key="item.attributeName" id="OptionDMEEM849963">{{ item.attributeName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" prop="note" style="width: 46%;" id="FormItemDMEEM960976">
            <Input v-model="externalEntityData.note" type="textarea" placeholder="输入备注" id="input627309" :rows="1" :autosize="{maxRows: 5}"></Input>
          </FormItem>
        </Form>
        <Form id="FormDMEEM363884">
          <FormItem label="导入属性列" id="FormItemDMEEM679885">
            <Select v-model="selectedAttributes" filterable multiple
                    :disabled="externalEntityData.zoneName === '' || externalEntityData.zoneName === undefined"
                    @on-change="changeAttr" id="editExternalEntityModalSelectedAttributes">
              <Option v-for="(item,index) in externalEntityColsData" :value="item.attributeName" :key="index"
                      :label="item.attributeName" id="OptionDMEEM013322">{{ item.attributeName }}
              </Option>
            </Select>
          </FormItem>
        </Form>
        <Table
          id="editExternalEntityModalSelectedAttributesTable"
          border
          :columns="attrColumns"
          :data="externalEntityColsDataFiltered"
          size="small"></Table>
        <div slot="footer" id="divDMEEM304050">
          <Button type="text" size="large" :loading="false" @click="cancelImport" id="ButtonDMEEM695340">取消</Button>
          <Button type="primary" size="large" @click="confirmImport" id="confirmEditExternalEntityButton">确认</Button>
        </div>
      </Modal>
      <Button type="error" style="margin: 5px" :disabled="currentData.id === undefined" @click="onClickDeleteButton"
              id="deleteExternalEntityButton">
        删除实体类
      </Button>
      <Button type="primary" style="margin: 5px" :disabled="currentData.id === undefined" @click="onClickEditButton"
              id="editExternalEntityButton">
        编辑实体类
      </Button>
      <Button type="primary" style="margin: 5px" :disabled="currentData.id === undefined"
              @click="onClickViewObjectsButton" id="viewExternalEntityButton">
        查看对象
      </Button>
      <Modal
        width="80%"
        v-model="viewObjectsModal"
        title="查看对象"
        scrollable
        :mask-closable="false"
        id="viewObjectsModal"
      >
        <div style="clear: both; margin: 10px" id="divDMEEM825729">
          <Row justify="space-between" type="flex" id="RowDMEEM971073">
            <Input v-model="filterQuery" type="textarea" style="width:calc(100% - 190px);;margin-left: 5px;" placeholder="输入过滤条件"
                   :autosize="true" @on-focus="inputQuery" id="searchObjectInput"></Input>
            <div id="divDMEEM836204">
              <Button type="primary" @click="searchObj" style="margin-left: 15px;" id='ExternalEntityButton519578'>查询</Button>
              <InternalEntityDataExport style="display:inline-block;margin-left: 10px;" :hasClass="true"
                            :targetClass="currentData.className" id='ExternalEntityDataExport622120' :condition="filterQuery"></InternalEntityDataExport>
            </div>
          </Row>
          <Table style="margin: 5px;"
                 width="100%"
                 height="450"
                 :loading="objectsDataloading"
                 stripe
                 border
                 show-header
                 highlight-row
                 :data="objectsData"
                 :columns="objectsDataColumns"
           id="TableDMEEM149413">
          </Table>
        </div>
        <div style="margin: 10px; overflow: hidden" id="divDMEEM316146">
          <div style="float: right; margin: 5px" id="divDMEEM574317">
            <Page
              style="margin-bottom: 20px"
              size="small"
              show-sizer
              show-elevator
              show-total
              placement="top"
              :page-size-opts="pageSizeOpts"
              :pageSize="objectsPageSize"
              :total="objectsDataCount"
              :current="objectsCurrentPage"
              @on-change="objectsChangePage"
              @on-page-size-change="objectsChangePageSize" id="PageDMEEM410106"></Page>
          </div>
        </div>
        <div slot="footer" id="divDMEEM989584">
          <i-button type="primary" size="large" @click="viewObjectsModal = false" id="confirmViewObjectsModalButton">
            确认
          </i-button>
        </div>
      </Modal>
    </div>
    <div style="float: right; margin: 10px 10px 0" id="divDMEEM665033">
      <Input
        v-model.trim="keyword"
        icon="md-search"
        placeholder="输入关键词查询"
        style="width: 200px; margin: 5px"
        @on-change="searchKeyword"
        id="searchExternalEntityInput"
      >
      </Input>
    </div>
    <div style="clear: both; margin: 10px" id="divDMEEM795338">
      <Table ref="viewTableExternalEntity"
             :height="tableHeight"
             style="margin: 5px;"
             :loading="loading"
             id="externalEntityTable"
             stripe
             border
             highlight-row
             size="small"
             :data="tableDataAll"
             :columns="tableColumns"
             @on-row-click="selectRow"
             @on-row-dblclick="handleDoubleClick"
             @on-sort-change="handleSortChange"
      >
      </Table>
    </div>
    <div style="margin: 10px; overflow: hidden" id="divDMEEM394206">
      <div style="float: right; margin: 5px" id="divDMEEM531350">
        <Page
          style="margin-bottom: 20px"
          size="small"
          show-sizer
          show-elevator
          show-total
          placement="top"
          :page-size-opts="pageSizeOpts"
          :pageSize="pageSize"
          :total="total"
          :current="currentPage"
          @on-change="changePage"
          @on-page-size-change="changePageSize" id="PageDMEEM452580"></Page>
      </div>
    </div>
    <Modal
      v-model="deleteConfirm"
      title="实体类删除"
     id="ModalDMEEM082671">
      <p style="word-break: break-all;" id="pDMEEM802025">确定要删除实体类【{{ currentData.displayName + currentData.className }}】吗?</p>
      <br>
<!--      <Checkbox v-if="deleteView" v-model="dropView">级联删除与此实体类关联的视图(<span style="color: orangered" id="spanDMEEM232960">请谨慎选择</span>)</Checkbox>-->
      <Checkbox v-model="cascade" id="CheckboxDMEEM956488">级联删除与此实体类关联的关联类、属性、表单、授权项(<span style="color: orangered" id="spanDMEEM441067">请谨慎选择</span>)</Checkbox>
      <div slot="footer" id="divDMEEM206880">
        <Button type="text" size="large" :loading="false" @click="deleteConfirm = false" id="ButtonDMEEM877617">取消</Button>
        <Button type="primary" size="large" :loading="deleteModalLoading" @click="deleteRowOnOk" id="ButtonDMEEM612632">确认</Button>
      </div>
    </Modal>

    <FilterQueryCommonModal
      :refClass="currentData.className"
      :targetClass="currentData.className"
      ref="filterQuery_modal"
      :store="store"
      @generatorFilterQuery="getFilterQuery" id="FilterQueryCommonModalDMEEM383353">
    </FilterQueryCommonModal>

    <ExternalEntityView
      ref="ExternalEntityView"
      @externalEntitiesCreate="externalEntitiesCreate"
     id="ExternalEntityViewDMEEM999113">

    </ExternalEntityView>
  </div>

</template>