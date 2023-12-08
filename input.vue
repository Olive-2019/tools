<template>
  <section v-if="t_preview" :addinName="name" :style="{'width': colWidth}" ref="main" addin-id="sectionTSEMO978545">
      <van-tree-select
          class="vant-tree"
          :height="arg_height"
          :items="temTreeList"
          :active-id.sync="args.activeIds"
          :main-active-index.sync="args.activeIndex"
       addin-id="van-tree-selectTSEMO681975" />
      <Spin fix v-if="spinShow" addin-id="SpinTSEMO356055"></Spin>

      <slot name="widget-footer" addin-id="slotTSEMO824509"></slot>
          <span v-show="t_edit" ref="edit" addin-id="spanTSEMO876250">
          <EditBox v-if="actEdit" :addinName="name" :widgetAnnotation="widgetAnnotation" :editExtendInfo="editExtendInfo" ref="editbox" v-model="args"
              :itemValue="itemValue"
              :attributes="filter_attributes"
              :router="router"
              :route="route"
              :root="root"
              :query_oprs="query_oprs"
              :targetclass="itemValue.data.targetClass" addin-id="EditBoxTSEMO190187">
              <div slot="attribute" addin-id="divTSEMO406349">
                  <p class="margin1" addin-id="pTSEMO835093">实体类</p>
                  <Select class="margin1 editbox-targetClass editbox-self-joins-tree" v-model="args.targetClass" filterable clearable @on-change="changeClass" addin-id="SelectTSEMO893383">
                      <OptionGroup label="实体类" addin-id="OptionGroupTSEMO239783">
                        <Option v-for="item in all_class" :key="item.id" :value="item.className" :label="item.displayName" addin-id="OptionTSEMO745715">
                            <span style="font-size: 12px;" addin-id="spanTSEMO145980">{{ item.displayName }}</span>
                            <span style="float:right;color:#ccc;font-size: 12px;" addin-id="spanTSEMO032671">{{ item.className }}</span>
                        </Option>
                      </OptionGroup>
                      <OptionGroup label="外部实体类" addin-id="OptionGroupTSEMO276923">
                        <Option v-for="item in allExternalEntities" :key="item.id" :value="item.className" :label="item.displayName" addin-id="OptionTSEMO354679">
                            <span style="font-size: 12px;" addin-id="spanTSEMO391517">{{ item.displayName }}</span>
                            <span style="float:right;color:#ccc;font-size: 12px;" addin-id="spanTSEMO228179">{{ item.className }}</span>
                        </Option>
                      </OptionGroup>
                  </Select>
                  <p class="margin1" addin-id="pTSEMO519504">关联属性</p>
                  <Select v-if="reloadAttr" ref="labelAttrSelect" class="margin1 editbox-self-joins-tree" v-model="args.relationAttr" filterable clearable addin-id="SelectTSEMO065279">
                      <OptionGroup label="系统属性" addin-id="OptionGroupTSEMO211312">
                      <Option v-for="(attr, index) in targetClassAttributes.sysAttr" :value="attr.attributeName"
                              :key="index || ''" :label="attr.displayName" addin-id="OptionTSEMO214909"></Option>
                      </OptionGroup>
                      <OptionGroup label="类属性" addin-id="OptionGroupTSEMO298787">
                      <Option v-for="(attr, index) in targetClassAttributes.selfAttr" :value="attr.attributeName"
                              :key="index || ''" :label="attr.displayName" addin-id="OptionTSEMO578715"></Option>
                      </OptionGroup>
                  </Select>
                  <p class="margin1" addin-id="pTSEMO431404">被关联属性</p>
                  <Select v-if="reloadAttr" ref="labelAttrSelect" class="margin1 editbox-self-joins-tree" v-model="args.associatedAttr" filterable clearable addin-id="SelectTSEMO076667">
                      <OptionGroup label="系统属性" addin-id="OptionGroupTSEMO842577">
                      <Option v-for="(attr, index) in associatedAttributes.sysAttr" :value="attr.attributeName"
                              :key="index || ''" :label="attr.displayName" addin-id="OptionTSEMO672620"></Option>
                      </OptionGroup>
                      <OptionGroup label="类属性" addin-id="OptionGroupTSEMO098717">
                      <Option v-for="(attr, index) in associatedAttributes.selfAttr" :value="attr.attributeName"
                              :key="index || ''" :label="attr.displayName" addin-id="OptionTSEMO177986"></Option>
                      </OptionGroup>
                  </Select>
                  <p class="margin1" addin-id="pTSEMO757010">根节点标签</p>
                  <Input class="margin1" type="textarea" :autosize="true" v-model="args.rootLabel" @on-focus="setLable(1)"  addin-id="InputTSEMO294300" />
                  <p class="margin1" addin-id="pTSEMO007093">子孙节点标签</p>
                  <Input class="margin1" type="textarea" :autosize="true" v-model="args.childrenLabel" @on-focus="setLable(2)"  addin-id="InputTSEMO502697" />
                  <p class="margin1" addin-id="pTSEMO871178">根节点为空时标签</p>
                  <Input class="margin1" v-model="args.rootEmptyLabel"  addin-id="InputTSEMO237381" />
                  <p class="margin1" addin-id="pTSEMO872627">子节点为空时标签</p>
                  <Input class="margin1" v-model="args.childrenEmptyLabel"  addin-id="InputTSEMO180838" />
                  <p class="margin1" addin-id="pTSEMO719185">根节点查询条件</p>
                  <Input class="margin1" type="textarea" :autosize="true" v-model="args.rootQuery" @on-focus="setLable(3)"  addin-id="InputTSEMO010669" />
                  <p class="margin1" addin-id="pTSEMO015879">子孙节点查询条件</p>
                  <Input class="margin1" type="textarea" :autosize="true" v-model="args.childrenQuery" @on-focus="setLable(4)" addin-id="InputTSEMO904675" />

                  <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTSEMO538125">
                      多选
                      <i-switch style="float: right" v-model="args.multiSwitch" @on-change="changeMulti"  addin-id="i-switchTSEMO071246" />
                  </div>
                  <div class="margin1" style="padding: 0 8px;margin: 10px 0;" addin-id="divTSEMO626067">
                    返回特定属性
                    <i-switch style="float: right" v-model="args.openReturnAttr" addin-id="i-switchTSEMO891797" />
                    <Row class="margin1" v-show="args.openReturnAttr" addin-id="RowTSEMO656158">
                      <Col span="24" style="text-align: center" addin-id="ColTSEMO901491">
                        <Button
                          type="primary"
                          style="text-align: center; width: 100%"
                          @click="openChooseReturnAttr"
                         addin-id="ButtonTSEMO064218">选择返回属性</Button>
                      </Col>
                    </Row>
                  </div>
                  <Row class="margin1" addin-id="RowTSEMO410178">
                      <Col span="10" addin-id="ColTSEMO117055">
                          <Button type="primary" @click="updateTree" addin-id="ButtonTSEMO126440">更新预览</Button>
                      </Col>
                  </Row>
              </div>
              <div slot="layout" addin-id="divTSEMO972435">
              </div>
              <div slot="operation" addin-id="divTSEMO049773">
              </div>
          </EditBox>
      </span>

      <!-- 设置节点标签弹窗 -->
      <Modal
          v-model="lableModal"
          width="700"
          title="设置标签"
           addin-id="ModalTSEMO689993">
          <Row class="lableTxt" addin-id="RowTSEMO959842">
              <Col span="4" addin-id="ColTSEMO744369">
                  <span addin-id="spanTSEMO453122">{{ editLabelSpan }}</span>
              </Col>
              <Col span="18" offset="1" addin-id="ColTSEMO028785">
                  <Input v-model="selfRootLable" type="textarea" :autosize="true" @on-change="mapAttr" addin-id="InputTSEMO655908" />
              </Col>
          </Row>
          <p class="attrTitle" v-show="!isChildLable" addin-id="pTSEMO964600">实体类属性:</p>
          <div class="attrBox" v-show="!isChildLable" addin-id="divTSEMO705204">
              <CheckboxGroup v-model="args.selected_entities_attributes" @on-change="clickAttr" addin-id="CheckboxGroupTSEMO864687">
                  <Collapse simple v-model="selfGroup" addin-id="CollapseTSEMO565964">
                      <Panel name="1" addin-id="PanelTSEMO823954">
                          系统属性
                          <div slot="content" addin-id="divTSEMO403907">
                              <Checkbox
                                  v-for="item in targetClassAttributes.sysAttr"
                                  :key="item.id"
                                  :label="`obj.${item.attributeName}`"
                                  class="commonLabel"
                                   addin-id="CheckboxTSEMO337996">{{ item.displayName }}
                              </Checkbox>
                          </div>
                      </Panel>
                      <Panel name="2" addin-id="PanelTSEMO977537">
                          类属性
                          <div slot="content" addin-id="divTSEMO247837">
                              <Checkbox
                                  v-for="item in targetClassAttributes.selfAttr"
                                  :key="item.id"
                                  :label="`obj.${item.attributeName}`"
                                  class="commonLabel"
                                   addin-id="CheckboxTSEMO780025">{{ item.displayName }}
                              </Checkbox>
                          </div>
                      </Panel>
                  </Collapse>
              </CheckboxGroup>
          </div>
          <p class="attrTitle" v-show="isChildLable" addin-id="pTSEMO459660">关联实体类属性:</p>
          <div class="attrBox" v-show="isChildLable" addin-id="divTSEMO170083">
              <CheckboxGroup v-model="args.selected_relation_entities_attributes" @on-change="clickRelationEntitiesAttr" addin-id="CheckboxGroupTSEMO825444">
                  <Collapse simple v-model="selfENGroup" addin-id="CollapseTSEMO070485">
                      <Panel name="1" addin-id="PanelTSEMO026250">
                          关联实体类系统属性
                          <div slot="content" addin-id="divTSEMO764828">
                              <Checkbox
                                  v-for="item in targetClassAttributes.sysAttr"
                                  :key="item.id"
                                  :label="`obj.${item.attributeName}`"
                                  class="commonLabel"
                                   addin-id="CheckboxTSEMO182282">{{ item.displayName }}
                              </Checkbox>
                          </div>
                      </Panel>
                      <Panel name="2" addin-id="PanelTSEMO996729">
                          关联实体类类属性
                          <div slot="content" addin-id="divTSEMO600075">
                              <Checkbox
                                  v-for="item in targetClassAttributes.selfAttr"
                                  :key="item.id"
                                  :label="`obj.${item.attributeName}`"
                                  class="commonLabel"
                                   addin-id="CheckboxTSEMO369684">{{ item.displayName }}
                              </Checkbox>
                          </div>
                      </Panel>
                  </Collapse>
              </CheckboxGroup>
          </div>
          <div slot="footer" addin-id="divTSEMO520672">
              <Button type="text" @click="lableModal = false" addin-id="ButtonTSEMO170088">取消</Button>
              <Button type="primary" @click="confirmLable" addin-id="ButtonTSEMO372204">确认</Button>
          </div>
      </Modal>
      <!-- 设置节点标签弹窗ending -->

      <!-- 根子节点过滤条件组件  -->
      <FilterQueryCommonModal
          v-if="actEdit" :addinName="name"
          :args="args"
          :itemValue="itemValue"
          :refClass="`${args.targetClass}&e`"
          :targetClass="itemValue.data.targetClass"
          ref="filterQuery_modal"
          :root="root"
          :store="store"
          @generatorFilterQuery="getFilterQuery" addin-id="FilterQueryCommonModalTSEMO155189">
      </FilterQueryCommonModal>

  </section>
  <section v-else :addinName="name" addin-id="sectionTSEMO942948">
      <span style="text-align:center" addin-id="spanTSEMO877324">
          <div class="form-addin-icon" addin-id="divTSEMO471098">
              <i class="iconfont" addin-id="iTSEMO155889">&#xe6c8;</i>
          </div>
          <div class="form-addin-name" addin-id="divTSEMO981618">
              树选择
          </div>
      </span>
  </section>
</template>