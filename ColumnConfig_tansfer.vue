<template>
    <Modal v-model="showPanel" style="height: 500px;" class-name="'tableColConfig'" mask-closable=false on-ok="apply" on-cancel="cancel" addin-id="ModalSCCCMO093144" :title="$t('ColumnConfig.ModalSCCCMO093144.title')">
      <div addin-id="divSCCCMO251637">
        <Input v-model="attrName" disabled=disabled style="margin: 0 0 5px 0;" addin-id="InputSCCCMO446960"/>
        <Input v-model="headerName" addin-id="InputSCCCMO158994"/>
        <Tabs name="simpleTableConfig" addin-id="TabsSCCCMO237267">
          <TabPane tab="simpleTableConfig" name="config" addin-id="TabPaneSCCCMO836557" :label="$t('ColumnConfig.TabPaneSCCCMO836557.label')">
            <Collapse simple=simple value="collapsePage" accordion=accordion addin-id="CollapseSCCCMO811811">
              <Panel name="1" v-show="type !== 'index'" addin-id="PanelSCCCMO096371">
{{$t('ColumnConfig.PanelSCCCMO096371.innerContent')}}
<p slot="content" addin-id="pSCCCMO519045">
{{$t('ColumnConfig.pSCCCMO519045.innerContent')}}
</p>
                <el-select slot="content" v-model="refClass" size="'mini'" ref="refClass" popper-class="grid-filter" class="ivu-select-dropdown100" style="position: relative;width: 100%;" clearable=clearable filterable=filterable on-change="refClassChanged" addin-id="el-selectSCCCMO889225">
                  <el-option-group addin-id="el-option-groupSCCCMO785769" :label="$t('ColumnConfig.el-option-groupSCCCMO785769.label')">
                    <el-option v-for="item in all_intEntities" key="item.className" value="item.className" label="item.className + ' ' + item.displayName" addin-id="el-optionSCCCMO103443">
                      <span addin-id="spanSCCCMO552479">{{ item.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO216114">{{ classNameDecorator(item.className) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group addin-id="el-option-groupSCCCMO832268" :label="$t('ColumnConfig.el-option-groupSCCCMO832268.label')">
                    <el-option v-for="item in all_extEntities" key="item.className" value="item.className" label="item.className + ' ' + item.displayName" addin-id="el-optionSCCCMO818923">
                      <span addin-id="spanSCCCMO811249">{{ item.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO248203">{{ classNameDecorator(item.className) }}</span>
                    </el-option>
                  </el-option-group>
                  
                  <el-option-group addin-id="el-option-groupSCCCMO167600" :label="$t('ColumnConfig.el-option-groupSCCCMO167600.label')">
                    <el-option v-for="item in all_relations" key="item.className" value="item.className" label="item.className + ' ' + item.displayName" addin-id="el-optionSCCCMO600898">
                      <span addin-id="spanSCCCMO016158">{{ item.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO088511">{{ classNameDecorator(item.className) }}</span>
                    </el-option>
                  </el-option-group>
                </el-select>
  
                <p slot="content" addin-id="pSCCCMO973143">
{{$t('ColumnConfig.pSCCCMO973143.innerContent')}}
</p>
                
                <el-select slot="content" v-model="browseAttr" size="'mini'" ref="browseAttr" popper-class="grid-filter" class="ivu-select-dropdown100" style="position: relative;width: 100%;" clearable=clearable filterable=filterable transfer="booleanTrue" addin-id="el-selectSCCCMO325211">
                  <el-option-group v-if="refClassAttrs_sys" addin-id="el-option-groupSCCCMO649882" :label="$t('ColumnConfig.el-option-groupSCCCMO649882.label')">
                    <el-option v-for="attr in refClassAttrs_sys" key="attr.attributeName" value="attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO053722">
                      <span addin-id="spanSCCCMO876872">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO290088">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_def" addin-id="el-option-groupSCCCMO758737" :label="$t('ColumnConfig.el-option-groupSCCCMO758737.label')">
                    <el-option v-for="attr in refClassAttrs_def" key="attr.attributeName" value="attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO230787">
                      <span addin-id="spanSCCCMO128958">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO617202">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_relationSys" addin-id="el-option-groupSCCCMO264346" :label="$t('ColumnConfig.el-option-groupSCCCMO264346.label')">
                    <el-option v-for="attr in refClassAttrs_relationSys" key="attr.attributeName" value="'relation_' + attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO739408">
                      <span addin-id="spanSCCCMO164424">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO008541">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_relationDef" addin-id="el-option-groupSCCCMO717643" :label="$t('ColumnConfig.el-option-groupSCCCMO717643.label')">
                    <el-option v-for="attr in refClassAttrs_relationDef" key="attr.attributeName" value="'relation_' + attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO826392">
                      <span addin-id="spanSCCCMO127540">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO679077">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                </el-select>
  
                <p slot="content" addin-id="pSCCCMO580899">
{{$t('ColumnConfig.pSCCCMO580899.innerContent')}}
</p>
                
                
                
                <el-select slot="content" v-model="returnAttr" size="'mini'" ref="returnAttr" popper-class="grid-filter" class="ivu-select-dropdown100" style="position: relative;width: 100%;" clearable=clearable filterable=filterable multiple=multiple transfer="booleanTrue" addin-id="el-selectSCCCMO720274">
  
                  <el-option-group v-if="refClassAttrs_sys" addin-id="el-option-groupSCCCMO439685" :label="$t('ColumnConfig.el-option-groupSCCCMO439685.label')">
                    <el-option v-for="attr in refClassAttrs_sys" key="attr.attributeName" value="attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO471429">
                      <span addin-id="spanSCCCMO635045">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO773090">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_def" addin-id="el-option-groupSCCCMO921812" :label="$t('ColumnConfig.el-option-groupSCCCMO921812.label')">
                    <el-option v-for="attr in refClassAttrs_def" key="attr.attributeName" value="attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO446756">
                      <span addin-id="spanSCCCMO745702">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO573291">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_relationSys" addin-id="el-option-groupSCCCMO026227" :label="$t('ColumnConfig.el-option-groupSCCCMO026227.label')">
                    <el-option v-for="attr in refClassAttrs_relationSys" key="attr.attributeName" value="'relation_' + attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO723808">
                      <span addin-id="spanSCCCMO402783">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO411165">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                  <el-option-group v-if="refClassAttrs_relationDef" addin-id="el-option-groupSCCCMO727108" :label="$t('ColumnConfig.el-option-groupSCCCMO727108.label')">
                    <el-option v-for="attr in refClassAttrs_relationDef" key="attr.attributeName" value="'relation_' + attr.attributeName" label="attr.attributeName + ' ' + attr.displayName || attr.attributeName" addin-id="el-optionSCCCMO637077">
                      <span addin-id="spanSCCCMO898984">{{ attr.displayName }}</span>
                      <span style="float:right;color:#ccc" addin-id="spanSCCCMO481356">{{ classNameDecorator(attr.attributeName) }}</span>
                    </el-option>
                  </el-option-group>
                </el-select>
                <p slot="content" class="margin1" addin-id="pSCCCMO584975">
{{$t('ColumnConfig.pSCCCMO584975.innerContent')}}
</p>
                <Input slot="content" class="margin1" v-model="filterQuery" type="textarea" rows="3" disabled="!refClass" on-focus="inputQuery" addin-id="InputSCCCMO146171" :placeholder="$t('ColumnConfig.InputSCCCMO146171.placeholder')"></Input>
                <FilterQueryCommonModal args="args" itemValue="itemValue" refClass="refClass" targetClass="itemValue.data.targetClass" ref="filterQuery_modal" root="root" store="store" generatorFilterQuery="getFilterQuery" addin-id="FilterQueryCommonModalSCCCMO618935">
                </FilterQueryCommonModal>
                <br slot="content"/>
                
                
                
                
  
                
              </Panel>
              <Panel name="2" style=style addin-id="PanelSCCCMO322134">
{{$t('ColumnConfig.PanelSCCCMO322134.innerContent')}}
<Row slot="content" class="margin-p" type="flex" align="middle" addin-id="RowSCCCMO122867">
                  <Col span="24" addin-id="ColSCCCMO550604">
                    <Input type="number" v-model="width" v-if="widthType === 'px'" addin-id="InputSCCCMO315108">
                      <span slot="prepend" addin-id="spanSCCCMO574884">
{{$t('ColumnConfig.spanSCCCMO574884.innerContent')}}
</span>
                      <Select v-model="widthType" slot="append" style="width: 70px;" addin-id="SelectSCCCMO344098">
                        <Option value="%" addin-id="OptionSCCCMO716594">%</Option>
                        <Option value="px" addin-id="OptionSCCCMO292351">px</Option>
                      </Select>
                    </Input>
                    <Input type="number" v-model="widthPercent" v-else-if="widthType === '%'" addin-id="InputSCCCMO168630">
                      <span slot="prepend" addin-id="spanSCCCMO033920">
{{$t('ColumnConfig.spanSCCCMO033920.innerContent')}}
</span>
                      <Select v-model="widthType" slot="append" style="width: 70px;" addin-id="SelectSCCCMO908482">
                        <Option value="%" addin-id="OptionSCCCMO483967">%</Option>
                        <Option value="px" addin-id="OptionSCCCMO644642">px</Option>
                      </Select>
                    </Input>
                  </Col>
                </Row>
  
              </Panel>
            </Collapse>
            <br/>
          </TabPane>
          <TabPane name="display" disabled="colId === '_SNColumn'" style="height: 300px;position: relative;" addin-id="TabPaneSCCCMO137339" :label="$t('ColumnConfig.TabPaneSCCCMO137339.label')">
          <Form class="margin1" addin-id="FormSCCCMO719059">
              <Select v-model="renderType" addin-id="SelectSCCCMO213811">
              <Option v-for="type in renderList" value="type.value" key="type.name" addin-id="OptionSCCCMO337268">{{type.name}}</Option>
              </Select>
          </Form>
          <Form v-show="renderType=='timeTransferRender'" class="margin1" addin-id="FormSCCCMO191400">
              <Select v-model="timeTransferFormat" addin-id="SelectSCCCMO286997" :placeholder="$t('ColumnConfig.SelectSCCCMO286997.placeholder')">
              <Option value="YYYY-MM-DD" key="1" addin-id="OptionSCCCMO247495" :label="$t('ColumnConfig.OptionSCCCMO247495.label')">
                  <span addin-id="spanSCCCMO424821">
{{$t('ColumnConfig.spanSCCCMO424821.innerContent')}}
</span>
                  <span style="float:right;color:#ccc" addin-id="spanSCCCMO682718">YYYY-MM-DD</span>
              </Option>
              <Option value="hh:mm:ss" key="2" addin-id="OptionSCCCMO487161" :label="$t('ColumnConfig.OptionSCCCMO487161.label')">
                  <span addin-id="spanSCCCMO789147">
{{$t('ColumnConfig.spanSCCCMO789147.innerContent')}}
</span>
                  <span style="float:right;color:#ccc" addin-id="spanSCCCMO079473">hh:mm:ss</span>
              </Option>
              <Option value="YYYY-MM-DD hh:mm:ss" key="3" addin-id="OptionSCCCMO639785" :label="$t('ColumnConfig.OptionSCCCMO639785.label')">
                  <span addin-id="spanSCCCMO352514">
{{$t('ColumnConfig.spanSCCCMO352514.innerContent')}}
</span>
                  <span style="float:right;color:#ccc" addin-id="spanSCCCMO875112">YYYY-MM-DD hh:mm:ss</span>
              </Option>
              </Select>
          </Form>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  </template>