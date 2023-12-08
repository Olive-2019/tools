<template>
  <section addinName="name" ref="main" style="{'width': colWidth}" addin-id="sectionTabMO251714">
    <div v-if="t_preview" addin-id="divTabMO148460">
      <van-tabs ref="tab" class="self-vant-tab" id="tabsWrap" name="tabUUID" v-model="tabIndex" animated="false" lazy-render="false" click="updateLabelFont" style="{'min-height': arg_height,
                'overflow': 'initial',
                'overflow-x': 'hidden',
                'backgroundImage': arg_bgPic,
                'backgroundSize': args.bgSize,
                'backgroundRepeat': args.bgRepeat,
                'backgroundColor': args.back_color,
                'border': this.args.border ? '1px solid #233' : '1px dashed #bbb',
                'padding': this.args.padding}">
        <van-tab v-for="(label,index) in args.tabs" tab="tabUUID" name="`${String(index)}`" title="label.name" style="{'backgroundColor': args.back_color}" key="`Pane${index}`" addin-id="van-tabTabMO609303">
          <TabPaneComponent label="label" height="arg_container_height" addinProps="addinProps" basicArgs="basicArgs" addin="tabAddinList[index]" originAddin="addin" ref="`Pane${index}`" activeAddin="activeAddin" copyAddin="copyAddin" removeAddin="removeAddin" deleteAddin="deleteAddin" commentAddin="commentAddin" snapShotHistory="() = addin-id=" TabPaneComponentTabMO886581=TabPaneComponentTabMO886581>
          </TabPaneComponent>
        </van-tab>
      </van-tabs>
      
      <slot name="widget-footer" addin-id="slotTabMO910347"></slot>
      <span v-show="t_edit" ref="edit" addin-id="spanTabMO691110">
        <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" router="router" route="route" root="root" itemValue="itemValue" query_oprs="query_oprs" targetclass="itemValue.data.targetClass" addin-id="EditBoxTabMO952849">
          <div slot="attribute" addin-id="divTabMO058670">
            <label class="margin1" addin-id="labelTabMO588501">
{{$t('Tab.labelTabMO588501.innerContent')}}
</label>
            <Row class="margin1" addin-id="RowTabMO558705">
              <Col span="12" addin-id="ColTabMO455984">
                <Input v-model="addTabName" size="small" addin-id="InputTabMO003498"/>
              </Col>
              <Col span="3" addin-id="ColTabMO832489">
                <Button type="text" size="small" click="addTab" addin-id="ButtonTabMO259359">
{{$t('Tab.ButtonTabMO259359.innerContent')}}
</Button>
              </Col>
            </Row>
            <label class="margin1" addin-id="labelTabMO728682">
{{$t('Tab.labelTabMO728682.innerContent')}}
</label>
            <Row class="margin1" v-for="(label,index) in args.tabs" addin-id="RowTabMO496859">
              <Col span="12" addin-id="ColTabMO604886">
                <Input v-model="args.tabs[index].name" size="small" readonly="!label.isRead" addin-id="InputTabMO480655"/>
              </Col>
              <Col span="3" addin-id="ColTabMO085144">
                <Button type="text" size="small" click="editTab(index, label.dropName)" addin-id="ButtonTabMO744334">{{ label.tabTxt }}</Button>
              </Col>
              <Col span="3" addin-id="ColTabMO852858">
                <Button type="text" size="small" click="delTab(index, label.dropName)" addin-id="ButtonTabMO742328">
{{$t('Tab.ButtonTabMO742328.innerContent')}}
</Button>
              </Col>
              <Col span="3" addin-id="ColTabMO310059">
                <Button type="text" size="small" icon="md-arrow-up" click="upItem(index)" addin-id="ButtonTabMO829084"></Button>
              </Col>
              <Col span="3" addin-id="ColTabMO666677">
                <Button type="text" size="small" icon="md-arrow-down" click="downItem(index)" addin-id="ButtonTabMO172651"></Button>
              </Col>
            </Row>
            <p class="margin1" addin-id="pTabMO885961">
{{$t('Tab.pTabMO885961.innerContent')}}
</p>
            <Input class="margin1" v-model="args.padding" addin-id="InputTabMO758629"></Input>
            <div class="margin1" style="padding: 0 20px 0 20px;margin: 10px 0 10px 0" addin-id="divTabMO849012">
{{$t('Tab.divTabMO849012.innerContent')}}
<i-switch style="float: right" v-model="args.border" addin-id="i-switchTabMO343773"/>
            </div>
          </div>
          <div slot="layout" addin-id="divTabMO058309">
             <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTabMO884863">
{{$t('Tab.divTabMO884863.innerContent')}}
<ColorPicker v-model="args.title_fontColor" addin-id="ColorPickerTabMO473465"/>
             </div>
          </div>
          <div slot="operation" addin-id="divTabMO215670">
          </div>
        </EditBox>
      </span>
    </div>


    <span v-else=v-else style="text-align: center" addin-id="spanTabMO861429">
            <div class="form-addin-icon" addin-id="divTabMO724830">
                <i class="icon iconfont icon-biaoqianye" addin-id="iTabMO502422"></i>
            </div>
       <div class="form-addin-name" addin-id="divTabMO536719">
{{$t('Tab.divTabMO536719.innerContent')}}
</div>
      
        </span>
  </section>
</template>