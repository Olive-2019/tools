<template>
    <div id="divABLK007259">
      <Card :bordered="false" dis-hover id="CardABLK899810">
        <Row :gutter="8" id="RowABLK980675">
          <Col span="9" class="auth-tree" id="ColABLK641739">
            <div style="height: 30px; text-align: left" id="divABLK317589">
              当前选中项：{{currentRow.id === undefined ? '（无）' : currentRow.attributeName ? `类 ${currentRow.className} - 属性 ${currentRow.attributeName}` : `类 ${currentRow.className}` }}
            </div>
            <Input
              v-model="keyword"
              id="searchBlockWord"
              icon="md-search"
              placeholder="输入关键词过滤实体类/关联类"
            >
            </Input>
            <a-table
              v-if="refreshAtable"
              id="blockClassTable"
              size="small"
              :indentSize="8"
              childrenColumnName="attributes"
              :columns="classColumns"
              :dataSource="filteredClasses"
              :rowSelection="classRowSelection"
              @expand="onClassExpand"
  
            >
              <span slot="engName" slot-scope="text, record" id="spanABK541326">
                <span :title="record.engName" style="overflow: hidden;text-overflow: ellipsis;display: inline-block;float: right;width: 80%;white-space: nowrap;word-break: break-all;" id="spanABK355606">
                  {{ record.engName }}
                </span>
              </span>
              <span slot="displayName" slot-scope="text, record" id="spanABK129996">
                <span :title="record.displayName" style="overflow: hidden;text-overflow: ellipsis;display: inline-block;float: left;width: 80%;white-space: nowrap;word-break: break-all;" id="spanABK691879">
                  {{ record.displayName }}
                </span>
              </span>
            </a-table>
          </Col>
          <Col span="15" class="auth-tree" v-if="currentRow.id !== undefined" id="ColABLK174512">
            <div v-if="!batchMode" style="height: 30px; text-align: left; width:70%;" id="divABLK737188">
              <Button id="switchModelButton" type="primary" size="small" @click="toggleBatchMode">进入批量模式</Button>
            </div>
            <div v-else style="height: 30px; text-align: left;width:70%;" id="divABLK101838">
              <Button type="primary" size="small" @click="toggleBatchMode" style="margin-right: 16px" id="ButtonABLK105502">进入独立模式</Button>
              <RadioGroup v-model="batchActionState" id="batchRadio">
                <Radio label="批量允许" id="RadioABLK282732"></Radio>
                <Radio label="批量禁止" id="RadioABLK746911"></Radio>
              </RadioGroup>
              <Button v-for="(value, key) in actions" :key="key" :id="batchButtonId(key)" @click="batchAction(key)"
                      style="margin-left: 5px;" size="small"
                      :type="batchActionState === '批量允许' ? 'success' : 'error'"
                      :disabled="selectedGroupKeys.length + selectedUserKeys.length === 0"
              >
                {{value}}
              </Button>
            </div>
  <!--          <div style="height: 30px;float: right">-->
  <!--            <span>是否显示用户 </span>-->
  <!--          <i-switch v-model="showUser" @on-change="changeShowUser" :loading="showUserLoading" />-->
  <!--          </i-switch>-->
  <!--          </div>-->
            <el-tabs v-model="userTabValue" type="card" @tab-click="handleTabChange" id="el-tabsABLK756312">
              <el-tab-pane
                :key="'1'"
                :label="'用户组'"
                :name="'1'"
               id="el-tab-paneABLK390030">
                <Input
                  v-model="keywordUserGroup"
                  id="searchBlockUserGroupWord"
                  search
                  placeholder="输入关键词过滤用户组"
                  @on-change="_handleSearchGroup"
                >
                </Input>
                <a-table
                  ref="userGroupTable"
                  id="blockUserGroupTable"
                  size="small"
                  :indentSize="8"
                  :loading="groupTableLoading"
                  :pagination="groupPagination"
                  :expandedRowKeys="userGroupRowKeys"
                  :columns="userGroupColumns"
                  :dataSource="userGroups"
                  :rowSelection="userGroupRowSelection"
                  :customRow="userGroupCustomRow"
                  @change="handlePageChange"
                  @expand="onUserGroupExpand"
                >
                  <div slot="name" slot-scope="text, record" class="a-table-slot-div" style="float: right" id="divABK699343">
                    <Icon :type="'md-people'" id="IconABK455918"></Icon>
                    <span class="a-table-slot-span" style="float: right" :title="record.name" id="spanABK897996">
                      {{ record.name }}
                    </span>
                  </div>
                  <div slot="displayName" slot-scope="text, record" class="a-table-slot-div" id="divABK026551">
                    <span class="a-table-slot-span" :title="record.displayName" id="spanABK761487">
                      {{ record.displayName }}
                    </span>
                  </div>
                  <div slot="parent" slot-scope="text, record" class="a-table-slot-div" id="divABK100320">
                    <span class="a-table-slot-span" :title="record.parent" id="spanABK718127">
                      {{ record.parent }}
                    </span>
                  </div>
                  <div slot="action" slot-scope="text, record" class="a-table-action-slot-div" id="divABK897841">
                    <Button  v-for="(value, key) in actions" :key="key" size="small" :id="`ButtonABLK775062${record.oid}${key}`"
                             v-if="record.actions && record.disabled"
                             :type="record.actions[key] ? 'success' : 'default'"
                             :disabled="record.disabled[key]"
                             @click="toggleAction(record.actions[key], `${record.key}_${key}`, record)" style="margin-left: 5px;">
                      {{value}}
                    </Button>
                  </div>
                  <span slot="more" slot-scope="text, record" id="spanABK311095">
                    <Button type="default" title="更多" :size="'small'" :id="`ButtonABLK775061${record.oid}`" icon="md-more" :disabled="record.childrenCount == 0 || (record.childrenCount > 0 && record.childrenCount <= 10) || (record.childrenCount  id="=ABK204511"> 10 && record.childrenCount == record.children.length)" style="margin-right: 8px;" @click.stop="childMore(record)"></Button>
                  </span>
                </a-table>
              </el-tab-pane>
              <el-tab-pane
                :key="'2'"
                :label="'用户'"
                :name="'2'"
               id="el-tab-paneABLK120829">
                <Input
                  v-model="keywordUser"
                  id="searchBlockUserWord"
                  search
                  style="width:45%;"
                  placeholder="输入关键词过滤用户"
                  @on-change="_handleSearchUser"
                >
                </Input>
                <div style="margin: 0% 0 0 1%;height: 32px;line-height: 32px;float: right;" id="divABLK683555">
                  <Button type="default" title="全部用户" :size="'small'" @click="freshAllUser" id="ButtonABLK583690">全部用户</Button>
                </div>
                <div style="width: 22%;margin: 0% 0 0 1%;float: right;height: 32px;line-height: 32px;" id="divABLK585421">
                  仅本组用户
                  <i-switch v-model="showUserInGroup" @on-change="changeShowUserInGroup" id="i-switchABLK357579" />
                </div>
                <p style="width: 15%;height: 32px;line-height: 32px;float: right;margin: 0% 0 0 1%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;" :title="currentGroupRow.name" id="pABLK926924">用户组：{{ currentGroupRow.name }}</p>
                <a-table
                  ref="userTable"
                  id="blockUserTable"
                  size="small"
                  :loading="userTableLoading"
                  :indentSize="8"
                  :pagination="userPagination"
                  :columns="userColumns"
                  :dataSource="users"
                  :rowSelection="userRowSelection"
                  @change="handleUserPageChange"
                >
                  <div slot="name" slot-scope="text, record" class="a-table-user-slot-div" style="float: left" id="divABK724775">
                    <Icon :type="'md-person'" id="IconABK075955"></Icon>
                    <span class="a-table-slot-span" style="float: right" :title="record.name"  id="spanABK600154">
                      {{ record.name }}
                    </span>
                  </div>
                  <div slot="displayName" slot-scope="text, record" class="a-table-user-slot-div" id="divABK269526">
                    <span class="a-table-slot-span" :title="record.displayName" id="spanABK801834">
                      {{ record.displayName }}
                    </span>
                  </div>
                  <div slot="parent" slot-scope="text, record" class="a-table-user-slot-div" id="divABK236250">
                    <span class="a-table-slot-span" :title="record.parent" id="spanABK657875">
                      {{ record.parent }}
                    </span>
                  </div>
                  <span slot="action" slot-scope="text, record, index" class="a-table-user-action-slot-div" id="spanABK183178">
                    <Button  v-for="(value, key) in actions" :key="key" size="small" :id="`ButtonABLK583295${index}${key}`"
                             v-if="record.actions && record.disabled"
                             :type="record.actions[key] ? 'success' : 'default'"
                             :disabled="record.disabled[key]"
                             @click="toggleAction(record.actions[key], `${record.key}_${key}`)" style="margin-left: 5px;">
                      {{value}}
                    </Button>
                  </span>
                </a-table>
              </el-tab-pane>
            </el-tabs>
          </Col>
        </Row>
      </Card>
    </div>
  </template>