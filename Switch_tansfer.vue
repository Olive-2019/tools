<template>
  <section v-if="t_preview" addinName="name" ref="main" style="{'width': colWidth}" addin-id="sectionSWMO814734">
    <template v-if="args.structural_layout === 'horizontal'">
      <section style="{'display': 'flex', 'align-items': labelXAlignFlex, 'justify-content': labelXAlign}" addin-id="sectionSWMO623548">

      <span v-if="args.required || args.label" style="{'width': labelWidth, 'display': 'inline-block',
      'padding-left':'16px','text-align': labelXAlign, 'padding-right': '10px'}" addin-id="spanSWMO735209">
          <span style="{'background-color': args.label_color, 'width': '100%', 'display': 'flex', 'justify-content': labelXAlign}" addin-id="spanSWMO940244">
              <span v-if="args.required" style="color: red" addin-id="spanSWMO466376">*</span>
              <label style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelSWMO782306">{{ args.label }}</label>
          </span>
      </span>
        
        <span style="{'height': arg_height, 'width': mainWidth, 'display': 'inline-block',
          'padding':'0 16px','text-align': mainXAlign, 'color': args.main_fontColor}" addin-id="spanSWMO011918">
          <span style="{'height': arg_height,'background-color': args.main_color, 'width': '100%', 'display': 'flex', 'align-items': 'center', 'justify-content': mainXAlign}" addin-id="spanSWMO047525">
          <van-switch size="arg_icon_size" v-model="value" style="{'background-color':background_color}" disabled="args.readonly" addin-id="van-switchSWMO319482"></van-switch>
          </span>
      </span>

      </section>
    </template>
    <template>
      <section style="{'align-items': labelXAlignFlex, 'justify-content': labelXAlign}" addin-id="sectionSWMO913712">

      <span v-if="args.required || args.label" style="{
        'align-items': labelYAlignFlex,'width': '100%', 'display': 'flex',
      'padding-left':'16px','text-align': labelXAlign, 'padding-right': '10px'}" addin-id="spanSWMO346236">
          <span style="{'background-color': args.label_color, 'width': '100%', 'display': 'flex', 'justify-content': labelXAlign}" addin-id="spanSWMO488830">
              <span v-if="args.required" style="color: red" addin-id="spanSWMO885227">*</span>
              <label style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelSWMO919964">{{ args.label }}</label>
          </span>
      </span>
        
        <span style="{'height': arg_height, 'width': '100%', 'display': 'inline-block',
          'padding':'0 16px','text-align': mainXAlign, 'color': args.main_fontColor}" addin-id="spanSWMO610037">
          <span style="{'height': arg_height,'background-color': args.main_color, 'width': '100%', 'display': 'flex', 'align-items': 'center', 'justify-content': mainXAlign}" addin-id="spanSWMO837043">
          <van-switch v-model="value" size="arg_icon_size" style="{'background-color':background_color}" disabled="args.readonly" addin-id="van-switchSWMO224973"></van-switch>
          </span>
      </span>

      </section>
      </template>
      <slot name="widget-footer" addin-id="slotSWMO293554"></slot>
      <span v-show="t_edit" ref="edit" addin-id="spanSWMO457545">

          <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" itemValue="itemValue" root="root" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxSWMO185800">
              <div slot="attribute" addin-id="divSWMO376655">
                  
              </div>
              <div slot="layout" addin-id="divSWMO284327">

                  <p class="margin1" addin-id="pSWMO999674">
{{$t('Switch.pSWMO999674.innerContent')}}
</p>
                  <Input class="margin1" v-model="args.iconsize" type="number" addin-id="InputSWMO975386">
                      <Select v-model="args.iconsizeType" slot="append" style="width: 70px;" addin-id="SelectSWMO965947">
                      <Option value="px" addin-id="OptionSWMO683305">px</Option>
                      <Option value="rem" addin-id="OptionSWMO408500">rem</Option>
                      </Select>
                  </Input>
              </div>
              <div slot="operation" addin-id="divSWMO047779">
              </div>
          </EditBox>
      </span>
  </section>
  <section v-else=v-else style="text-align: center" addinName="name" addin-id="sectionSWMO520062">
      <div class="form-addin-icon" addin-id="divSWMO468309">
              <i class="iconfont" addin-id="iSWMO648163">&#xe623;</i>
      </div>
      <div class="form-addin-name" addin-id="divSWMO111326">
{{$t('Switch.divSWMO111326.innerContent')}}
</div>
  </section>
</template>
