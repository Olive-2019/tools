<template>
  <!-- 使用v-if,v-else-if语句来设置插件的显示样式 -->
  <section v-if="t_preview" :addinName="name" :style="{'width': colWidth}" addin-id="sectionSIMMO618528">
      <span v-if="args.required || args.label" :style="{'width': labelWidth, 'display': 'inline-block',
      'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
      'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanSIMMO861772">
        <span v-if="args.required" style="color: red" addin-id="spanSIMMO767976">*</span>
        <label class="msize" :style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelSIMMO449258">{{ args.label }}</label>
      </span>
      <span :style="{'height': arg_height, 'line-height': arg_height, 'width': mainWidth, 'display': 'inline-block','background-color': args.main_color, 'text-align': mainXAlign, 'vertical-align': mainYAlign}" addin-id="spanSIMMO646558">
          <van-button icon="edit" type="default" addin-id="van-buttonSIMMO813282">{{ args.signText }}</van-button>
      </span>

      <!-- 预览模式时，有编辑框的显示；ref属性用于获取指定的dom元素，如ref="x",则在script中用this.$refs.x来选中该dom元素 -->
      <slot name="widget-footer" addin-id="slotSIMMO478081"></slot>
      <span v-show="t_edit" ref="edit" addin-id="spanSIMMO112730">
          <EditBox v-if="actEdit" :addinName="name" :widgetAnnotation="widgetAnnotation" :editExtendInfo="editExtendInfo" ref="editbox" v-model="args"
              :attributes="filter_attributes"
              :router="router"
              :route="route"
              :root="root"
              :itemValue="itemValue"
              :dataTypes="dataTypes"
              :targetclass="itemValue.data.targetClass" addin-id="EditBoxSIMMO350603">
              <div slot="attribute" addin-id="divSIMMO957975">
                <p class="margin1" id="pSignB955068">按钮文字</p>
                <Input class="margin1" v-model="args.signText"  maxlength="8" show-word-limit id="InputSignB492074" />
                <Row type="flex" align="middle" addin-id="RowSIMMO987283">
                  <Col span="6" addin-id="ColSIMMO488909">
                    <span id="lineWidthText">画笔粗细</span>
                  </Col>
                  <Col span="18" addin-id="ColSIMMO972109">
                    <InputNumber id="lineWidthValue" :max="10" :min="1" v-model="args.lineWidth"></InputNumber>
                  </Col>
                </Row>
                <div class="margin1" id="divSignB025128">
                    <p class="margin1" style="float: left; margin-right: 10px;" id="pSignB573576">画笔颜色:</p>
                    <ColorPicker v-model="args.lineColor" id="ColorPickerSignB911114" />
                </div>
                <div class="margin1" id="divSignB025129">
                    <p class="margin1" style="float: left; margin-right: 10px;" id="pSignB573577">画布背景:</p>
                    <ColorPicker v-model="args.bgColor" id="ColorPickerSignB911115" />
                </div>
                <div class="margin1" addin-id="divSIMMO077701">
                  存储类型
                  <RadioGroup class="margin1" v-model="args.saveType" style="margin-left: 10px;" addin-id="RadioGroupSIMMO106587">
                    <Radio label="base" addin-id="RadioSIMMO526186">Base64</Radio>
                    <Radio label="file" addin-id="RadioSIMMO321640">文件</Radio>
                  </RadioGroup>
                </div>
                <div class="margin1" id="divSignB218599">
                    裁剪空白处
                    <i-switch style="float: right" v-model="args.isCrop" id="i-switchSignB746719" />
                </div>
              </div>
              <div slot="layout" addin-id="divSIMMO917113">
                <div class="margin1" style="margin: 10px 0 10px 0" id="divEDB599997">
                  横屏
                  <i-switch style="float: right" v-model="args.horFlag" :disabled="args.readonlyDisabled" id="i-switchEDB709199" />
                </div>
              </div>
              <div slot="operation" addin-id="divSIMMO229904">
                  <!--
                      事件选项放置区域
                  -->
              </div>
          </EditBox>
      </span>
  </section>
  <section v-else style="text-align: center" :addinName="name" addin-id="sectionSIMMO505780">
      <span style="text-align:center" addin-id="spanSIMMO351636">
          <div class="form-addin-icon" addin-id="divSIMMO509460">
              <i class="iconfont" addin-id="iSIMMO388354">&#xe726;</i>
          </div>

          <div class="form-addin-name" addin-id="divSIMMO155305">
          签名
          </div>
      </span>
  </section>
</template>