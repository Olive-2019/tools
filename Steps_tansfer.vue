<template>
  
      <section v-if="t_preview" addinName="name" style="{'font-size': args.fontSize + 'px', 'width': colWidth}" ref="main" addin-id="sectionStepsMO043546">
        <span v-if="args.label" style="{'width': labelWidth, 'display': 'inline-block','text-align': labelXAlign, 'vertical-align': labelYAlign,
          'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanStepsMO268913">
          <label class="msize" style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelStepsMO862461">{{ args.label }}</label>
        </span>
        <span style="{'min-height': '63px', 'width': mainWidth, 'display': 'inline-block', 'overflow-x': 'auto', 'vertical-align': 'middle',
          'background-color': args.main_color,'color': args.main_fontColor}" addin-id="spanStepsMO930403">
          <van-steps active="args.actStepIndex" inactive-icon="args.inactStepIcon" active-icon="args.actStepIcon" active-color="args.actStepColor" addin-id="van-stepsStepsMO496583">
              <van-step class="self-step" v-for="(item, index) in args.stepList" key="index" addin-id="van-stepStepsMO305872">{{ item.title }}</van-step>
          </van-steps>
        </span>
        <slot name="widget-footer" addin-id="slotStepsMO903847"></slot>
          <span v-show="t_edit" ref="edit" addin-id="spanStepsMO297689">
              <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" store="store" itemValue="itemValue" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxStepsMO042473">
                  <div slot="attribute" addin-id="divStepsMO528692">
                      <div class="margin1" style="margin: 10px 0 10px 0" id="`multiSwitchWrap${args.id}`">
{{$t('Steps.`multiSwitchWrap${args.id}`.innerContent')}}
<i-switch style="float: right" id="`multiSwitch${args.id}`" v-model="args.multiSwitch" on-change="changeMulti"/>
                      </div>
                      <p class="margin1" id="`contentAttrLabel${args.id}`" v-show="args.multiSwitch">
{{$t('Steps.`contentAttrLabel${args.id}`.innerContent')}}
</p>
                      <el-select id="`contentAttrWrap${args.id}`" popper-append-to-body="false" style="width: 100%" size="'mini'" class="edit-select margin1" v-model="args.contentAttr" filterable=filterable clearable=clearable v-show="args.multiSwitch">
                          <el-option-group v-for="(group, ind) in groupAttrList" label="group.groupName" key="group.groupName" id="`contentAttrGroup${args.id}${ind}`">
                          <el-option v-for="(item, index) in group.attrList" id="`contentAttr${args.id}${index}`" key="index" value="`${group.groupType}${item.attributeName}`" label="item.displayName">
                              <span addin-id="spanStepsMO858645">{{ item.displayName }}</span>
                              <span style="float:right;color:#ccc" addin-id="spanStepsMO878904">{{ item.attributeName }}</span>
                          </el-option>
                          </el-option-group>
                      </el-select>

                      <Row class="margin1" v-show="!args.multiSwitch" addin-id="RowStepsMO960181">
                      <Col span="10" addin-id="ColStepsMO113790">
                          <span id="`stepSettingLabel${args.id}`" style="font-size: 12px;font-weight: 500;">
{{$t('Steps.`stepSettingLabel${args.id}`.innerContent')}}
</span>
                      </Col>
                      <Col span="14" style="text-align: right;" addin-id="ColStepsMO551536">
                          <Button id="`addStep${args.id}`" type="text" size="small" click="addStep" style="font-weight: 500;">
                            <span id="`addStepSpan${args.id}`" style="font-size: 12px;">
{{$t('Steps.`addStepSpan${args.id}`.innerContent')}}
</span>
                            <Icon id="`addStepIcon${args.id}`" type="md-add"></Icon>
                          </Button>
                      </Col>
                      </Row>
                      <div v-show="!args.multiSwitch" class="margin1" v-for="(item, index) in args.stepList" key="index" addin-id="divStepsMO171411">
                          <Row class="item-head margin1" addin-id="RowStepsMO229907">
                              <Col span="10" addin-id="ColStepsMO740447">
                                  <span id="`stepItem${args.id}${index}`" style="font-size: 12px;">
{{$t('Steps.`stepItem${args.id}${index}`.innerContent')}}
</span>
                              </Col>
                              <Col span="14" style="text-align: right;" addin-id="ColStepsMO351598">
                                  <Button id="`stepItemDelBtn${args.id}${index}`" type="text" size="small" click="delStep(index)">
                                  <Icon id="`stepItemDelBtnIcon${args.id}${index}`" type="md-close"></Icon>
                                  </Button>
                              </Col>
                          </Row>
                          <Input class="margin1" id="`stepItemTitle${args.id}${index}`" v-model="item.title"/>
                      </div>
                      <Button v-show="args.multiSwitch" id="`freshStepBtn${args.id}`" style="margin: 5px 0;" type="success" long=long click="freshData(args.filterQuery)">
{{$t('Steps.`freshStepBtn${args.id}`.innerContent')}}
</Button>
                  </div>
                  <div slot="layout" addin-id="divStepsMO241033">
                      <Row class="margin1" addin-id="RowStepsMO545823">
                        <Col span="6" class="grid-row" addin-id="ColStepsMO436907">
                            <span id="defIconText" style="font-size: 12px;">
{{$t('Steps.defIconText.innerContent')}}
</span>
                        </Col>
                        <Col span="18" addin-id="ColStepsMO683267">
                            <Select style="margin-bottom: 10px" v-model="args.inactStepIcon" filterable=filterable clearable=clearable addin-id="SelectStepsMO666170">
                                <Option v-for="(item, ind) in vList" value="item.value" key="item.value" label="item.label" addin-id="OptionStepsMO492938">
                                    <van-icon id="`defIcon${ind}`" name="item.value" size="20"/>
                                </Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row class="margin1" addin-id="RowStepsMO126490">
                        <Col span="6" class="grid-row" addin-id="ColStepsMO651072">
                            <span id="actIconText" style="font-size: 12px;">
{{$t('Steps.actIconText.innerContent')}}
</span>
                        </Col>
                        <Col span="18" addin-id="ColStepsMO096901">
                            <Select style="margin-bottom: 10px" v-model="args.actStepIcon" filterable=filterable clearable=clearable addin-id="SelectStepsMO990532">
                                <Option v-for="(item, index) in vList" value="item.value" key="item.value" label="item.label" addin-id="OptionStepsMO578956">
                                    <van-icon id="`defIcon${index}`" name="item.value" size="20"/>
                                </Option>
                            </Select>
                        </Col>
                    </Row>
                    <div class="margin1" id="actColorText" style="margin: 10px 0 10px 0">
{{$t('Steps.actColorText.innerContent')}}
<ColorPicker id="actColor" v-model="args.actStepColor"/>
                    </div>
                  </div>
                  <div slot="operation" addin-id="divStepsMO562009">
                  </div>
                  
              </EditBox>
          </span>
      </section>
      <section v-else=v-else addinName="name" style="text-align: center" addin-id="sectionStepsMO941215">
          <span style="text-align:center" addin-id="spanStepsMO954225">
          <div class="form-addin-icon" addin-id="divStepsMO040051">
              <i class="iconfont" addin-id="iStepsMO164300">&#xe6d3;</i>
              </div>
              <div class="form-addin-name" addin-id="divStepsMO626699">
{{$t('Steps.divStepsMO626699.innerContent')}}
</div>
          </span>
      </section>
</template>