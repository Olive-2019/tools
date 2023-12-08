<template>
  <section v-if="t_preview" addinName="name" style="{'font-size': '14px', 'width': colWidth}" ref="main" addin-id="sectionSTMO619697">
    <template v-if="args.structural_layout === 'horizontal'">
      <span v-if="args.required || args.label" style="{'width': labelWidth, 'display': 'inline-block',
          'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
          'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanSTMO843755">
              <span v-if="args.required" style="color: red" addin-id="spanSTMO775976">*</span>
              <label style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelSTMO123829">{{ args.label }}</label>
      </span>
      <span style="{'height': arg_height,'line-height': arg_height, 'width': mainWidth, 'display': 'inline-block',
          'text-align': mainXAlign, 'vertical-align': mainYAlign,
          'font-size': args_fsize,
          'color': args.txt_fontColor}" addin-id="spanSTMO812989">
          <van-stepper ref="number" class="i-input" v-model="arg_defaultvalue" theme="args.theme" max="parseFloat(args.max)" min="parseFloat(args.min)" step="parseFloat(args.step)" disable-input="args.readonly" disable-minus="args.readonly" disable-plus="args.readonly" button-size="arg_btnSize" input-width="args_inputWidth" integer="arg_integer" change="numberDefaultValueChange" addin-id="van-stepperSTMO579946"/>
      </span>
    </template>
    <template>
      <span v-if="args.required || args.label" style="{'width': '100%', 'display': 'inline-block',
          'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
          'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanSTMO357808">
              <span v-if="args.required" style="color: red" addin-id="spanSTMO173751">*</span>
              <label style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelSTMO606474">{{ args.label }}</label>
      </span>
      <span style="{'height': arg_height, 'width': '100%', 'display': 'inline-block',
          'text-align': mainXAlign, 'vertical-align': mainYAlign,
          'font-size': args_fsize,
          'color': args.txt_fontColor}" addin-id="spanSTMO757450">
          <van-stepper ref="number" class="i-input" v-model="arg_defaultvalue" theme="args.theme" max="parseFloat(args.max)" min="parseFloat(args.min)" step="parseFloat(args.step)" disable-input="args.readonly" disable-minus="args.readonly" disable-plus="args.readonly" button-size="arg_btnSize" input-width="args_inputWidth" integer="arg_integer" change="numberDefaultValueChange" addin-id="van-stepperSTMO992826"/>
</span>
</template>
<slot name="widget-footer" addin-id="slotSTMO378074"></slot>
<span v-show="t_edit" ref="edit" addin-id="spanSTMO115527">
<EditBox v-if="actEdit" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" itemValue="itemValue" route="route" root="root" addinName="name" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxSTMO874618">
              <div slot="attribute" addin-id="divSTMO502887">

                  <p class="margin1" addin-id="pSTMO242352">
{{$t('Stepper.pSTMO242352.innerContent')}}
</p>
                  <InputNumber class="margin1" min="args.min + 1" style="width: 100%" v-model="args.max" addin-id="InputNumberSTMO321234" :placeholder=$t('Stepper.InputNumberSTMO321234.placeholder')/>
                  <p class="margin1" addin-id="pSTMO463931">
{{$t('Stepper.pSTMO463931.innerContent')}}
</p>
                  <InputNumber class="margin1" style="width: 100%" v-model="args.min" addin-id="InputNumberSTMO098246" :placeholder=$t('Stepper.InputNumberSTMO098246.placeholder')/>

                  <p class="margin1" addin-id="pSTMO090856">
{{$t('Stepper.pSTMO090856.innerContent')}}
</p>
                  <InputNumber class="margin1" style="width: 100%" max="1e20" min="-1e20" v-model="args.step" on-change="checkInt" addin-id="InputNumberSTMO664937"/>


              </div>
              <div slot="layout" addin-id="divSTMO606058">
                  <p class="margin1" addin-id="pSTMO309891">
{{$t('Stepper.pSTMO309891.innerContent')}}
</p>
                  <Select v-model="args.theme" addin-id="SelectSTMO425622">
                      <Option value="default" addin-id="OptionSTMO462327">
{{$t('Stepper.OptionSTMO462327.innerContent')}}
</Option>
                      <Option value="round" addin-id="OptionSTMO869259">
{{$t('Stepper.OptionSTMO869259.innerContent')}}
</Option>
                  </Select>
                  <p class="margin1" addin-id="pSTMO621848">
{{$t('Stepper.pSTMO621848.innerContent')}}
</p>
                  <Input class="margin1" v-model="args.btnSize" on-change="nonegbtnSize" type="number" addin-id="InputSTMO929375">
                      <Select v-model="args.btnSizeType" slot="append" style="width: 70px;" addin-id="SelectSTMO076545">
                      <Option value="px" addin-id="OptionSTMO242043">px</Option>
                      <Option value="rem" addin-id="OptionSTMO465197">rem</Option>
                      </Select>
                  </Input>
                  <p class="margin1" addin-id="pSTMO016798">
{{$t('Stepper.pSTMO016798.innerContent')}}
</p>
                  <Input class="margin1" v-model="args.inputWidth" on-change="noneginputWidth" type="number" addin-id="InputSTMO961698">
                      <Select v-model="args.inputWidthType" slot="append" style="width: 70px;" addin-id="SelectSTMO978699">
                      <Option value="px" addin-id="OptionSTMO350962">px</Option>
                      <Option value="rem" addin-id="OptionSTMO518212">rem</Option>
                      </Select>
                  </Input>
                  <div class="margin1" addin-id="divSTMO238996">
                      <p class="margin1" style="float: left; margin-right: 15px;" addin-id="pSTMO302722">
{{$t('Stepper.pSTMO302722.innerContent')}}
</p>
                      <ColorPicker v-model="args.btn_backcolor" addin-id="ColorPickerSTMO813440"/>
                  </div>
                  <div class="margin1" addin-id="divSTMO758223">
                      <p class="margin1" style="float: left; margin-right: 15px;" addin-id="pSTMO340035">
{{$t('Stepper.pSTMO340035.innerContent')}}
</p>
                      <ColorPicker v-model="args.btn_color" addin-id="ColorPickerSTMO890788"/>
                  </div>
              </div>
              <div slot="operation" addin-id="divSTMO319809">
              </div>
          </EditBox>
      </span>
  </section>
  <section v-else=v-else addinName="name" style="text-align: center" addin-id="sectionSTMO918489">
      <div class="form-addin-icon" addin-id="divSTMO315117">
          <i class="iconfont" addin-id="iSTMO053255">&#xe6f2;</i>
      </div>

    <div class="form-addin-name" addin-id="divSTMO375963">
{{$t('Stepper.divSTMO375963.innerContent')}}
</div>

  </section>
</template>