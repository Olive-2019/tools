<template>
    <div id="divAAR203017">
      <div style="float: left; margin: 10px" id="divAAR017716">
        <Button id="createAttrRuleButton" type="primary" style="margin: 5px" click="showAddRowModal">
{{$t('AttrAccessRule.createAttrRuleButton.innerContent')}}
</Button>
        <Modal v-model="addRowModal" id="createAttrRuleModal" mask-closable="false" :title="$t('AttrAccessRule.createAttrRuleModal.title')">
          <Form ref="addRowForm" model="addRowData" rules="rowValidate" label-position="top" submit=submit native=native prevent=prevent id="FormAAR627810">
            <FormItem prop="name" id="FormItemAAR343744" :label="$t('AttrAccessRule.FormItemAAR343744.label')">
              <Input id="attrRuleName" v-model="addRowData.name" :placeholder="$t('AttrAccessRule.attrRuleName.placeholder')"></Input>
            </FormItem>
            <FormItem prop="content" id="FormItemAAR415250" :label="$t('AttrAccessRule.FormItemAAR415250.label')">
              <Input id="attrRuleContent" v-model="addRowData.content" type="textarea" rows="4" :placeholder="$t('AttrAccessRule.attrRuleContent.placeholder')"></Input>
            </FormItem>
            <FormItem prop="note" id="FormItemAAR557378" :label="$t('AttrAccessRule.FormItemAAR557378.label')">
              <Input id="attrRuleNote" v-model="addRowData.note" type="textarea" rows="4" autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('AttrAccessRule.attrRuleNote.placeholder')"></Input>
            </FormItem>
          </Form>
          <div slot="footer" id="divAAR519050">
            <Button type="text" size="large" loading="false" click="addRowModal = false" id="ButtonAAR060375">
{{$t('AttrAccessRule.ButtonAAR060375.innerContent')}}
</Button>
            <Button id="confirmCreateAttrRuleButton" type="primary" size="large" loading="addRowModalLoading" click="addRow">
{{$t('AttrAccessRule.confirmCreateAttrRuleButton.innerContent')}}
</Button>
          </div>
        </Modal>
        <Button id="deleteAttrRuleButton" type="error" style="margin: 5px" disabled="currentData.id === undefined" click="deleteRow">
{{$t('AttrAccessRule.deleteAttrRuleButton.innerContent')}}
</Button>
        <Button id="editAttrRuleButton" type="primary" style="margin: 5px" disabled="currentData.id === undefined" click="editRowModal = true">
{{$t('AttrAccessRule.editAttrRuleButton.innerContent')}}
</Button>
        <Modal v-model="editRowModal" id="editAttrRuleModal" mask-closable="false" :title="$t('AttrAccessRule.editAttrRuleModal.title')">
          <Form ref="editRowForm" model="editRowData" rules="rowValidate" label-position="top" submit=submit native=native prevent=prevent id="FormAAR885319">
            <FormItem prop="name" id="FormItemAAR130511" :label="$t('AttrAccessRule.FormItemAAR130511.label')">
              <Input id="editAttrRuleName" v-model="editRowData.name" :placeholder="$t('AttrAccessRule.editAttrRuleName.placeholder')"></Input>
            </FormItem>
            <FormItem prop="content" id="FormItemAAR693289" :label="$t('AttrAccessRule.FormItemAAR693289.label')">
              <Input id="editAttrRuleContent" v-model="editRowData.content" type="textarea" rows="4" :placeholder="$t('AttrAccessRule.editAttrRuleContent.placeholder')"></Input>
            </FormItem>
            <FormItem prop="note" id="FormItemAAR072567" :label="$t('AttrAccessRule.FormItemAAR072567.label')">
              <Input id="editAttrRuleNote" v-model="editRowData.note" type="textarea" rows="4" autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('AttrAccessRule.editAttrRuleNote.placeholder')"></Input>
            </FormItem>
          </Form>
          <div slot="footer" id="divAAR887778">
            <Button type="text" size="large" loading="false" click="editRowModal = false" id="ButtonAAR034408">
{{$t('AttrAccessRule.ButtonAAR034408.innerContent')}}
</Button>
            <Button id="confirmEditAttrRuleButton" type="primary" size="large" loading="editRowModalLoading" click="editRow">
{{$t('AttrAccessRule.confirmEditAttrRuleButton.innerContent')}}
</Button>
          </div>
        </Modal>
      </div>
      <div style="float: right; margin: 10px" id="divAAR254175">
        <Input v-model="keyword" id="searchAttrRuleKey" icon="md-search" style="width: 200px; margin: 5px" on-change="searchKeyword" :placeholder="$t('AttrAccessRule.searchAttrRuleKey.placeholder')">
        </Input>
      </div>
      <div style="clear: both; margin: 10px" id="divAAR051383">
        <Table ref="viewTableAccess" id="attrRuleTable" height="tableHeight" style="margin: 5px" loading="loading" stripe=stripe border=border show-header=show-header highlight-row=highlight-row size="small" data="tableDataPage" columns="tableColumns" on-row-click="selectRow" on-row-dblclick="handleDoubleClick">
        </Table>
      </div>
      <div style="margin: 10px; overflow: hidden" id="divAAR125231">
        <div style="float: right; margin: 5px" id="divAAR581425">
          <Page style="margin-bottom: 20px" size="small" show-sizer=show-sizer show-elevator=show-elevator show-total=show-total placement="top" page-size-opts="pageSizeOpts" pageSize="pageSize" total="filteredTableData.length" current=current sync="currentPage" on-change="changePage" on-page-size-change="changePageSize" id="PageAAR403779"></Page>
        </div>
      </div>
  
      <Modal v-model="deleteConfirm" id="deleteAttrRuleModal" :title="$t('AttrAccessRule.deleteAttrRuleModal.title')">
        <p id="pAAR714115">
{{$t('AttrAccessRule.pAAR714115.innerContent')}}
</p>
        <br/>
        <Checkbox v-model="cascade" id="cascadeDeleteEntity">
{{$t('AttrAccessRule.cascadeDeleteEntity.innerContent')}}
<span style="color: orangered" id="spanAAR233803">
{{$t('AttrAccessRule.spanAAR233803.innerContent')}}
</span>)</Checkbox>
        <div slot="footer" id="divAAR278629">
          <Button id="cancelDeleteAttrRuleModal" type="text" size="large" loading="false" click="deleteConfirm = false">
{{$t('AttrAccessRule.cancelDeleteAttrRuleModal.innerContent')}}
</Button>
          <Button id="confirmDeleteAttrRuleModal" type="primary" size="large" loading="deleteModalLoading" click="deleteRowOnOk">
{{$t('AttrAccessRule.confirmDeleteAttrRuleModal.innerContent')}}
</Button>
        </div>
      </Modal>
    </div>
  </template>