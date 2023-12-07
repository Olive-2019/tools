<template>
  
  <section v-if="t_preview" addinName="name" style="{'width': colWidth}">
      <span v-if="args.required || args.label" style="{'width': labelWidth, 'display': 'inline-block',
      'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
      'background-color': args.label_color, 'padding-right': '10px'}">
        <span v-if="args.required" style="color: red">*</span>
        <label class="msize" style="{'color': args.label_fontColor, 'font-size': args_lfsize}">{{ args.label }}</label>
      </span>
      <span style="{'height': arg_height, 'line-height': arg_height, 'width': mainWidth, 'display': 'inline-block','background-color': args.main_color, 'text-align': mainXAlign, 'vertical-align': mainYAlign}">
          <van-button icon="edit" type="default">{{ args.signText }}</van-button>
      </span>

      
      <slot name="widget-footer"></slot>
      <span v-show="t_edit" ref="edit">
          <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" itemValue="itemValue" dataTypes="dataTypes" targetclass="itemValue.data.targetClass">
              <div slot="attribute">
                <p class="margin1" id="pSignB955068">
{{$t(SignImg.pSignB955068.innerContent)}}
</p>
                <Input class="margin1" v-model="args.signText" maxlength="8" show-word-limit=show-word-limit id="InputSignB492074"/>
                <Row type="flex" align="middle">
                  <Col span="6">
                    <span id="lineWidthText">
{{$t(SignImg.lineWidthText.innerContent)}}
</span>
                  </Col>
                  <Col span="18">
                    <InputNumber id="lineWidthValue" max="10" min="1" v-model="args.lineWidth"></InputNumber>
                  </Col>
                </Row>
                <div class="margin1" id="divSignB025128">
                    <p class="margin1" style="float: left; margin-right: 10px;" id="pSignB573576">
{{$t(SignImg.pSignB573576.innerContent)}}
</p>
                    <ColorPicker v-model="args.lineColor" id="ColorPickerSignB911114"/>
                </div>
                <div class="margin1" id="divSignB025129">
                    <p class="margin1" style="float: left; margin-right: 10px;" id="pSignB573577">
{{$t(SignImg.pSignB573577.innerContent)}}
</p>
                    <ColorPicker v-model="args.bgColor" id="ColorPickerSignB911115"/>
                </div>
                <div class="margin1">
                  存储类型
                  <RadioGroup class="margin1" v-model="args.saveType" style="margin-left: 10px;">
                    <Radio label="base">Base64</Radio>
                    <Radio label="file">文件</Radio>
                  </RadioGroup>
                </div>
                <div class="margin1" id="divSignB218599">
{{$t(SignImg.divSignB218599.innerContent)}}
<i-switch style="float: right" v-model="args.isCrop" id="i-switchSignB746719"/>
                </div>
              </div>
              <div slot="layout">
                <div class="margin1" style="margin: 10px 0 10px 0" id="divEDB599997">
{{$t(SignImg.divEDB599997.innerContent)}}
<i-switch style="float: right" v-model="args.horFlag" disabled="args.readonlyDisabled" id="i-switchEDB709199"/>
                </div>
              </div>
              <div slot="operation">
                  
              </div>
          </EditBox>
      </span>
  </section>
  <section v-else=v-else style="text-align: center" addinName="name">
      <span style="text-align:center">
          <div class="form-addin-icon">
              <i class="iconfont">&#xe726;</i>
          </div>

          <div class="form-addin-name">
          签名
          </div>
      </span>
  </section>
</template>
