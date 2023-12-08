<template>
  
      <section v-if="t_preview" addinName="name" style="{'font-size': args.fontSize + 'px', 'width': colWidth, 'padding-bottom': 0 + ' !important'}" ref="main" addin-id="sectionTSMO352737">
        <span style="{'width': '100%', 'height': arg_height, 'display': 'inline-block', 'background-color': args.main_color,'color': args.main_fontColor, 'overflow-y': 'auto'}" addin-id="spanTSMO795905">
          <van-steps direction="vertical" active="args.actStepIndex" inactive-icon="args.inactStepIcon" active-icon="args.actStepIcon" active-color="actColor" addin-id="van-stepsTSMO583459">
              <van-step class="self-step" v-for="(item, index) in args.stepList" key="index" addin-id="van-stepTSMO835762">
                <h3 style="{'color': index == args.actStepIndex ? actColor : index < args.actStepIndex ? '#323233' : '#969799'}" addin-id="h3TSMO877397">{{ item.title }}</h3>
                <p v-for="(noteItem, ind) in item.note" key="ind" addin-id="pTSMO950781">{{ noteItem }}</p>
              </van-step>
          </van-steps>
        </span>
        <slot name="widget-footer" addin-id="slotTSMO481442"></slot>
          <span v-show="t_edit" ref="edit" addin-id="spanTSMO011335">
              <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" store="store" itemValue="itemValue" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxTSMO581588">
                  <div slot="attribute" addin-id="divTSMO856676">
                      <p class="margin1" addin-id="pTSMO935675">
{{$t('TimeSteps.pTSMO935675.innerContent')}}
</p>
                      <Select class="edit-select" v-model="args.stepTitle" filterable=filterable clearable=clearable addin-id="SelectTSMO352766">
                          <OptionGroup v-for="group in groupAttrList" label="group.groupName" key="group.groupName" addin-id="OptionGroupTSMO404536">
                          <Option v-for="(item, index) in group.attrList" key="index" value="`${group.groupType}${item.attributeName}`" label="item.displayName" addin-id="OptionTSMO464378">
                              <span addin-id="spanTSMO716141">{{ item.displayName }}</span>
                              <span style="float:right;color:#ccc" addin-id="spanTSMO314444">{{ item.attributeName }}</span>
                          </Option>
                          </OptionGroup>
                      </Select>
                      <p class="margin1" addin-id="pTSMO814971">
{{$t('TimeSteps.pTSMO814971.innerContent')}}
</p>
                      <Select class="edit-select" v-model="args.stepNote" filterable=filterable multiple=multiple clearable=clearable addin-id="SelectTSMO827073">
                          <OptionGroup v-for="group in groupAttrList" label="group.groupName" key="group.groupName" addin-id="OptionGroupTSMO757415">
                          <Option v-for="(item, index) in group.attrList" key="index" value="`${group.groupType}${item.attributeName}`" label="item.displayName" addin-id="OptionTSMO317849">
                              <span addin-id="spanTSMO864708">{{ item.displayName }}</span>
                              <span style="float:right;color:#ccc" addin-id="spanTSMO765528">{{ item.attributeName }}</span>
                          </Option>
                          </OptionGroup>
                      </Select>
                      <Button style="margin-top: 15px;" type="success" long=long click="freshData(args.filterQuery)" addin-id="ButtonTSMO926354">
{{$t('TimeSteps.ButtonTSMO926354.innerContent')}}
</Button>
                  </div>
                  <div slot="layout" addin-id="divTSMO532425">
                      
                      <Row class="margin1" addin-id="RowTSMO043376">
                            <Col span="6" class="grid-row" addin-id="ColTSMO039550">
                                <span style="font-size: 12px;" addin-id="spanTSMO634492">
{{$t('TimeSteps.spanTSMO634492.innerContent')}}
</span>
                            </Col>
                            <Col span="18" addin-id="ColTSMO738473">
                                <Select style="margin-bottom: 10px" v-model="args.inactStepIcon" filterable=filterable clearable=clearable addin-id="SelectTSMO825026">
                                    <Option v-for="item in vList" value="item.value" key="item.value" label="item.label" addin-id="OptionTSMO790027">
                                        <van-icon name="item.value" size="20" addin-id="van-iconTSMO980140"/>
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row class="margin1" addin-id="RowTSMO890494">
                            <Col span="6" class="grid-row" addin-id="ColTSMO848130">
                                <span style="font-size: 12px;" addin-id="spanTSMO259837">
{{$t('TimeSteps.spanTSMO259837.innerContent')}}
</span>
                            </Col>
                            <Col span="18" addin-id="ColTSMO447819">
                                <Select style="margin-bottom: 10px" v-model="args.actStepIcon" filterable=filterable clearable=clearable addin-id="SelectTSMO625374">
                                    <Option v-for="item in vList" value="item.value" key="item.value" label="item.label" addin-id="OptionTSMO818471">
                                        <van-icon name="item.value" size="20" addin-id="van-iconTSMO795443"/>
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                        <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTSMO226899">
{{$t('TimeSteps.divTSMO226899.innerContent')}}
<ColorPicker v-model="args.actStepColor" alpha=alpha addin-id="ColorPickerTSMO058614"/>
                        </div>

                  </div>
                  <div slot="operation" addin-id="divTSMO357918">
                  </div>
                  
              </EditBox>
          </span>
      </section>
      <section v-else=v-else addinName="name" style="text-align: center" addin-id="sectionTSMO196071">
          <span style="text-align:center" addin-id="spanTSMO151246">
          <div class="form-addin-icon" addin-id="divTSMO888908">
              <i class="iconfont" addin-id="iTSMO285027">&#xe6d8;</i>
              </div>
              <div class="form-addin-name" addin-id="divTSMO713170">
{{$t('TimeSteps.divTSMO713170.innerContent')}}
</div>
          </span>
      </section>
</template>