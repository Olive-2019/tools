<template>
  
      <section v-if="t_preview" addinName="name" style="{'font-size': args.fontSize + 'px', 'width': colWidth}" ref="main" addin-id="sectionTIMO767009">
        <template v-if="args.structural_layout === 'horizontal'">
          <span v-if="args.required || args.label" style="{'width': labelWidth, 'display': 'inline-block',
          'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
          'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanTIMO885335">
              <span v-if="args.required" style="color: red" addin-id="spanTIMO386168">*</span>
              <label class="msize" style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelTIMO260252">{{ args.label }}</label>
          </span>
          <span style="{'min-height': arg_height, 'width': mainWidth, 'display': 'inline-block',
              'text-align': mainXAlign, 'vertical-align': mainYAlign,
              'background-color': args.main_color,'color': args.main_fontColor}" addin-id="spanTIMO497888">
              <van-field v-if="addIcon" class="i-input" v-model="args.defaultValue" input-align="mainXAlign" placeholder="args.placeholder" left-icon="args.prefixIcon" right-icon="args.suffixIcon" size="args.size" type="args.type" maxlength="args.maxLength==''?null:args.maxLength" show-word-limit="args.showWordLimit" readonly="args.readonly && !t_preview" rows="parseInt(args.maxAreaRow)" style="{'padding-top':'0','padding-bottom':'0','height': arg_height, 'min-height': arg_height, 'line-height': arg_height, 'width': '100%', 'text-align': mainXAlign, 'color': args.txt_fontColor, 'font-size': args_fsize, 'background-color': args.txt_bgColor}" addin-id="van-fieldTIMO545844"></van-field>
          </span>
        </template>
        <template>
          <span v-if="args.required || args.label" style="{'width': '100%', 'display': 'flex',
          'padding-left':'16px','text-align': labelXAlign, 'align-items': labelYAlignFlex,
          'background-color': args.label_color, 'padding-right': '10px'}" addin-id="spanTIMO160039">
            <div style="{'width': '100%', 'padding-right': '10px'}" addin-id="divTIMO965125">
              <span v-if="args.required" style="color: red" addin-id="spanTIMO626213">*</span>
              <label class="msize" style="{'color': args.label_fontColor, 'font-size': args_lfsize}" addin-id="labelTIMO917821">{{ args.label }}</label>
            </div>
          </span>
          <span style="{'min-height': arg_height, 'width': '100%', 'display': 'inline-block',
              'text-align': mainXAlign, 'vertical-align': mainYAlign,
              'color': args.main_fontColor}" addin-id="spanTIMO756718">
              <van-field v-if="addIcon" class="i-input" v-model="args.defaultValue" input-align="mainXAlign" placeholder="args.placeholder" left-icon="args.prefixIcon" right-icon="args.suffixIcon" size="args.size" type="args.type" readonly="args.readonly && !t_preview" rows="parseInt(args.maxAreaRow)" maxlength="args.maxLength==''?null:args.maxLength" show-word-limit="args.showWordLimit" style="{'padding-top':'0','padding-bottom':'0','height': arg_height, 'min-height': arg_height, 'line-height': arg_height, 'width': '100%', 'text-align': mainXAlign, 'color': args.txt_fontColor, 'font-size': args_fsize, 'background-color': args.txt_bgColor}" addin-id="van-fieldTIMO684738"></van-field>
          </span>
        </template>
        <slot name="widget-footer" addin-id="slotTIMO090674"></slot>
          <span v-show="t_edit" ref="edit" addin-id="spanTIMO664719">
              <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" store="store" itemValue="itemValue" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxTIMO926051">
                  <div slot="attribute" addin-id="divTIMO443828">
                      <p class="margin1" addin-id="pTIMO789707">
{{$t('TextInput.pTIMO789707.innerContent')}}
</p>
                      <Select class="margin1" v-model="args.type" on-change="changeType" addin-id="SelectTIMO261980">
                          <Option v-for="item in inputTypeList" value="item.value" key="item.value" label="item.value" addin-id="OptionTIMO146850">{{item.value}}

                          <span style="float:right;color:#ccc" addin-id="spanTIMO167149">{{ item.label }}</span>
                          </Option>
                      </Select>
                      <p class="margin1" v-show="args.type == 'textarea'" addin-id="pTIMO720242">
{{$t('TextInput.pTIMO720242.innerContent')}}
</p>
                      <InputNumber class="margin1" v-show="args.type == 'textarea'" min="1" v-model="args.maxAreaRow" style="width: 100%;" addin-id="InputNumberTIMO344093"></InputNumber>
                      <p class="margin1" addin-id="pTIMO788127">
{{$t('TextInput.pTIMO788127.innerContent')}}
</p>
                      <Input class="margin1" type="text" v-model="args.placeholder" addin-id="InputTIMO493467"/>
                      <p class="margin1" addin-id="pTIMO543284">
{{$t('TextInput.pTIMO543284.innerContent')}}
</p>
                      <Select v-model="args.prefixIcon" filterable=filterable clearable=clearable on-change="chooseIcon" addin-id="SelectTIMO108708">
                        <Option v-for="item in iconList" value="item.value" key="item.value" label="item.label" addin-id="OptionTIMO815373">
                          <van-icon name="`${item.value}`" size=20 addin-id="van-iconTIMO409825"></van-icon>
                          <span style="float:right;color:#ccc" addin-id="spanTIMO655607">{{ item.label }}</span>
                        </Option>
                      </Select>
                      <p class="margin1" addin-id="pTIMO381173">
{{$t('TextInput.pTIMO381173.innerContent')}}
</p>
                      <Select v-model="args.suffixIcon" filterable=filterable clearable=clearable on-change="chooseIcon" addin-id="SelectTIMO268676">
                        <Option v-for="item in iconList" value="item.value" key="item.value" label="item.label" addin-id="OptionTIMO476304">
                          <van-icon name="`${item.value}`" size=20 addin-id="van-iconTIMO376489"></van-icon>
                          <span style="float:right;color:#ccc" addin-id="spanTIMO377864">{{ item.label }}</span>
                        </Option>
                      </Select>

                      <p class="margin1" addin-id="pTIMO498657">
{{$t('TextInput.pTIMO498657.innerContent')}}
</p>
                      <Input class="margin1" v-model="args.maxLength" type="number" addin-id="InputTIMO606456"/>

                      <div class="margin1" addin-id="divTIMO313733">
{{$t('TextInput.divTIMO313733.innerContent')}}
<i-switch style="float: right" v-model="args.showWordLimit" addin-id="i-switchTIMO579437"/>
                      </div>
                  </div>
                  <div slot="layout" addin-id="divTIMO775319">
                  </div>
                  <div slot="operation" addin-id="divTIMO678487">
                  </div>
              </EditBox>
          </span>
      </section>
      <section v-else=v-else addinName="name" style="text-align: center" addin-id="sectionTIMO952805">
          <span style="text-align:center" addin-id="spanTIMO655013">
          <div class="form-addin-icon" addin-id="divTIMO184216">
              <i class="iconfont" addin-id="iTIMO941615">&#xe624;</i>
              </div>
              <div class="form-addin-name" addin-id="divTIMO017292">
{{$t('TextInput.divTIMO017292.innerContent')}}
</div>
          </span>
      </section>
</template>