<template>
  <section addinName="name" v-if="t_preview" addin="layout" style="{'width': arg_width, 'min-height': arg_height, 'backgroundColor': args.back_color,'padding-top': arg_pt,
      'padding-bottom': arg_pb,
      'padding-left': arg_pl,
      'padding-right': arg_pr}" class="addin actPc addin-layout">
    <span v-if="args.label" style="{'width': labelWidth, 'display': 'inline-block',
    'padding-left':'16px','text-align': labelXAlign, 'vertical-align': labelYAlign,
    'background-color': args.label_color, 'padding-right': '10px'}">
        <label class="msize" style="{'color': args.label_fontColor, 'font-size': args_lfsize}">{{ args.label }}</label>
    </span>
    <span style="{'height': arg_imgHeight, 'min-height': arg_imgHeight, 'width': mainWidth, 'display': 'inline-block',
        'text-align': mainXAlign, 'vertical-align': mainYAlign,
        'background-color': args.main_color,}">
        
        <van-image width="arg_imgWidth" height="arg_imgHeight" fit="args.imgFitType" src="arg_imgSrc" style="{'border-top': `${args.tbWidth == 0 && args.tbColor == '#bbb'? 1 : args.tbWidth}px ${args.tbStyle} ${args.tbColor}`,'border-right': `${args.rbWidth == 0 && args.rbColor == '#bbb' ? 1 : args.rbWidth}px ${args.rbStyle} ${args.rbColor}`,
            'border-bottom': `${args.bbWidth == 0 && args.bbColor == '#bbb' ? 1 : args.bbWidth}px ${args.bbStyle} ${args.bbColor}`,
            'border-left': `${args.lbWidth == 0 && args.lbColor == '#bbb' ? 1 : args.lbWidth}px ${args.lbStyle} ${args.lbColor}`,
            'borderRadius': `${arg_ltRadius} ${arg_rtRadius} ${arg_rbRadius} ${arg_lbRadius}`,'overflow': args.ltRadius == 0 && args.rtRadius == 0 && args.lbRadius == 0 && args.rbRadius == 0 ? 'visible' : 'hidden'}">
          <template v-slot=v-slot>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </span>
        <slot name="widget-footer"></slot>
        <span v-show="t_edit" ref="edit">
            <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" itemValue="itemValue" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass">
                <div slot="attribute">

                  <p class="margin1" id="pEDB108729">{{$t(FILE.pEDB108729.innerContent)}}</p>
                  <Input class="margin1" v-model="args.imgHeight" type="number" id="InputIMGB722037">
                    <Select v-model="args.imgHeightType" slot="append" style="width: 70px;" id="SelectIMGB551198">
                      <Option value="px" id="OptionIMGB861525">px</Option>
                      <Option value="vw" id="OptionIMGB012673">vw</Option>
                      <Option value="vh" id="OptionIMGB923770">vh</Option>
                      <Option value="rem" id="OptionIMGB449186">rem</Option>
                    </Select>
                  </Input>

                  <p class="margin1" id="pEDB174678">{{$t(FILE.pEDB174678.innerContent)}}</p>
                  <Input class="margin1" v-model="args.imgWidth" type="number" id="InputIMGB193261">
                    <Select v-model="args.imgWidthType" slot="append" style="width: 70px;" id="SelectIMGB184482">
                      <Option value="%" id="OptionIMGB667001">%</Option>
                      <Option value="px" id="OptionIMGB061044">px</Option>
                      <Option value="vw" id="OptionIMGB674289">vw</Option>
                      <Option value="vh" id="OptionIMGB808472">vh</Option>
                      <Option value="rem" id="OptionIMGB409849">rem</Option>
                    </Select>
                  </Input>

                  <div class="margin1" style="height: 20px;">
                    <b>内边距</b>
                    <Tooltip placement="left" style="float: right;" :content=null>
                      <Button size="small" icon="ios-attach" shape="circle" click=click native="attachMargin"></Button>
                    </Tooltip>
                  </div>
                  <Row type="flex" align="middle">
                      <Col span="6">
                        <span>上内边距</span>
                      </Col>
                      <Col span="18">
                        <Input class="margin1" v-model="args.paddingTop" type="number">
                          <Select v-model="args.paddingTopType" slot="append" style="width: 70px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                            <Option value="vw">vw</Option>
                            <Option value="vh">vh</Option>
                            <Option value="rem">rem</Option>
                          </Select>
                        </Input>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col span="6">
                        <span>下内边距</span>
                      </Col>
                      <Col span="18">
                        <Input class="margin1" v-model="args.paddingBottom" type="number">
                          <Select v-model="args.paddingBottomType" slot="append" style="width: 70px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                            <Option value="vw">vw</Option>
                            <Option value="vh">vh</Option>
                            <Option value="rem">rem</Option>
                          </Select>
                        </Input>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col span="6">
                        <span>左内边距</span>
                      </Col>
                      <Col span="18">
                        <Input class="margin1" v-model="args.paddingLeft" type="number">
                          <Select v-model="args.paddingLeftType" slot="append" style="width: 70px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                            <Option value="vw">vw</Option>
                            <Option value="vh">vh</Option>
                            <Option value="rem">rem</Option>
                          </Select>
                        </Input>
                      </Col>
                    </Row>
                    <Row type="flex" align="middle">
                      <Col span="6">
                        <span>右内边距</span>
                      </Col>
                      <Col span="18">
                        <Input class="margin1" v-model="args.paddingRight" type="number">
                          <Select v-model="args.paddingRightType" slot="append" style="width: 70px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                            <Option value="vw">vw</Option>
                            <Option value="vh">vh</Option>
                            <Option value="rem">rem</Option>
                          </Select>
                        </Input>
                      </Col>
                    </Row>
                  <p class="margin1" style="height: 20px;">
                    <b>圆角属性</b>
                    <Tooltip placement="left" style="float: right;" :content=null>
                      <Button size="small" icon="ios-attach" shape="circle" click=click native="attachRadius"></Button>
                    </Tooltip>
                  </p>
                  <Row type="flex" align="middle">
                    <Col span="6">
                      <span>左上</span>
                    </Col>
                    <Col span="18">
                      <Input class="margin1" type="number" v-model="args.ltRadius">
                        <Select v-model="args.ltRadiusType" slot="append" style="width: 50px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                        </Select>
                      </Input>
                    </Col>
                  </Row>
                  <Row type="flex" align="middle">
                    <Col span="6">
                      <span>右上</span>
                    </Col>
                    <Col span="18">
                      <Input class="margin1" type="number" v-model="args.rtRadius" on-change="radiusChange(args.rtRadius, 'rt')">
                        <Select v-model="args.rtRadiusType" slot="append" style="width: 50px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                        </Select>
                      </Input>
                    </Col>
                  </Row>
                  <Row type="flex" align="middle">
                    <Col span="6">
                      <span>左下</span>
                    </Col>
                    <Col span="18">
                      <Input class="margin1" type="number" v-model="args.lbRadius" on-change="radiusChange(args.lbRadius, 'lb')">
                        <Select v-model="args.lbRadiusType" slot="append" style="width: 50px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                        </Select>
                      </Input>
                    </Col>
                  </Row>
                  <Row type="flex" align="middle">
                    <Col span="6">
                      <span>右下</span>
                    </Col>
                    <Col span="18">
                      <Input class="margin1" type="number" v-model="args.rbRadius" on-change="radiusChange(args.rbRadius, 'rb')">
                        <Select v-model="args.rbRadiusType" slot="append" style="width: 50px;">
                            <Option value="px">px</Option>
                            <Option value="%">%</Option>
                        </Select>
                      </Input>
                    </Col>
                  </Row>
                </div>
              <div slot="layout">
                <div class="margin1" style="margin: 10px 0 10px 0">
                  <p class="margin1" style="height: 20px;">
                    <span>上边框</span>
                    <Tooltip placement="left" style="float: right;" :content=null>
                      <Button size="small" icon="ios-attach" shape="circle" click=click native="attachBorder"></Button>
                    </Tooltip>
                  </p>
                  <Row type="flex" align="middle">
                    <Col span="6">
                      <ColorPicker v-model="args.tbColor"/>
                    </Col>
                    <Col span="8">
                      <Input class="margin1" v-model="args.tbWidth" type="number">
                        <span slot="append">px</span>
                      </Input>
                    </Col>
                    <Col span="10">
                      <Select class="margin1" v-model="args.tbStyle">
                        <Option value="solid">实线</Option>
                        <Option value="dashed">虚线</Option>
                        <Option value="dotted">点线</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
                    <div class="margin1" style="margin: 10px 0 10px 0">
                      下边框
                      <Row type="flex" align="middle">
                        <Col span="6">
                          <ColorPicker v-model="args.bbColor"/>
                        </Col>
                        <Col span="8">
                          <Input class="margin1" v-model="args.bbWidth" type="number">
                            <span slot="append">px</span>
                          </Input>
                        </Col>
                        <Col span="10">
                          <Select class="margin1" v-model="args.bbStyle">
                            <Option value="solid">实线</Option>
                            <Option value="dashed">虚线</Option>
                            <Option value="dotted">点线</Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
                    <div class="margin1" style="margin: 10px 0 10px 0">
                      左边框
                      <Row type="flex" align="middle">
                        <Col span="6">
                          <ColorPicker v-model="args.lbColor"/>
                        </Col>
                        <Col span="8">
                          <Input class="margin1" v-model="args.lbWidth" type="number">
                            <span slot="append">px</span>
                          </Input>
                        </Col>
                        <Col span="10">
                          <Select class="margin1" v-model="args.lbStyle">
                            <Option value="solid">实线</Option>
                            <Option value="dashed">虚线</Option>
                            <Option value="dotted">点线</Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
                    <div class="margin1" style="margin: 10px 0 10px 0">
                      右边框
                      <Row type="flex" align="middle">
                        <Col span="6">
                          <ColorPicker v-model="args.rbColor"/>
                        </Col>
                        <Col span="8">
                          <Input class="margin1" v-model="args.rbWidth" type="number">
                            <span slot="append">px</span>
                          </Input>
                        </Col>
                        <Col span="10">
                          <Select class="margin1" v-model="args.rbStyle">
                            <Option value="solid">实线</Option>
                            <Option value="dashed">虚线</Option>
                            <Option value="dotted">点线</Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
              </div>
            </EditBox>
        </span>
  </section>
  <section v-else-if="t_icon" addinName="name" style="text-align: center">
    <div class="form-addin-icon">
      <i class="iconfont">&#xe6a7;</i>
    </div>
    <div class="form-addin-name" style="width: 100%">图片</div>
  </section>
</template>