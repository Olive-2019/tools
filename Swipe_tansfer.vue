<template>
  
      <section v-if="t_preview" addinName="name" style="{'font-size': args.fontSize + 'px', 'width': colWidth, 'padding-bottom': 0 + ' !important'}" ref="main" addin-id="sectionSwipeMO908725">
        <span style="{'height': arg_height, 'min-height': arg_height, 'width': '100%', 'display': 'inline-block',
            'background-color': args.main_color,'color': args.main_fontColor}" addin-id="spanSwipeMO753117">
          <van-swipe v-if="reloadSwipe" class="my-swipe" style="{'height': arg_height, 'min-height': arg_height, 'width': '100%'}" autoplay="args.autoPlayTimer" loop="args.needLoop" indicator-color="white" addin-id="van-swipeSwipeMO536686">
              <van-swipe-item v-for="(image, index) in args.swipeList" key="index" addin-id="van-swipe-itemSwipeMO482580">
                <img v-if="image.imgOri == 'imgBase' && image.imgUrl" src="`${baseImgUrl}/files-download/${image.imgUrl}`" addin-id="imgSwipeMO086245"/>
                <img v-else-if="image.imgOri == 'imgSelf' && image.imgUrl" src="image.imgUrl" addin-id="imgSwipeMO951641"/>
                <span v-else=v-else addin-id="spanSwipeMO959724">{{ index+1 }}</span>
              </van-swipe-item>
          </van-swipe>
        </span>
        <slot name="widget-footer" addin-id="slotSwipeMO514331"></slot>
          <span v-show="t_edit" ref="edit" addin-id="spanSwipeMO655464">
              <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" attributes="filter_attributes" router="router" route="route" root="root" store="store" itemValue="itemValue" query_oprs="query_oprs" dataTypes="dataTypes" targetclass="itemValue.data.targetClass" addin-id="EditBoxSwipeMO734034">
                  <div slot="attribute" addin-id="divSwipeMO813185">
                    <p class="margin1" addin-id="pSwipeMO650207">
{{$t('Swipe.pSwipeMO650207.innerContent')}}
</p>
                    <Input class="margin1" v-model="args.autoPlayTimer" type="number" addin-id="InputSwipeMO042976">
                        <span slot="append" addin-id="spanSwipeMO709589">ms</span>
                    </Input>
                    <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divSwipeMO084973">
{{$t('Swipe.divSwipeMO084973.innerContent')}}
<i-switch style="float: right" v-model="args.needLoop" addin-id="i-switchSwipeMO161174"/>
                    </div>
                    <Row class="margin1" addin-id="RowSwipeMO503102">
                      <Col span="10" addin-id="ColSwipeMO634765">
                          <span style="font-size: 12px;font-weight: 500;" addin-id="spanSwipeMO552736">
{{$t('Swipe.spanSwipeMO552736.innerContent')}}
</span>
                      </Col>
                      <Col span="14" style="text-align: right;" addin-id="ColSwipeMO613308">
                          <Button type="text" size="small" click="addSwipe" style="font-weight: 500;" addin-id="ButtonSwipeMO207360">
                            <span style="font-size: 12px;" addin-id="spanSwipeMO349964">
{{$t('Swipe.spanSwipeMO349964.innerContent')}}
</span>
                            <Icon type="md-add" addin-id="IconSwipeMO016758"></Icon>
                          </Button>
                      </Col>
                    </Row>
                    <div class="margin1" v-for="(item, index) in args.swipeList" key="index" addin-id="divSwipeMO182685">
                        <Row class="item-head margin1" addin-id="RowSwipeMO076229">
                          <Col span="10" addin-id="ColSwipeMO974234">
                              <span style="font-size: 12px;" addin-id="spanSwipeMO863479">
{{$t('Swipe.spanSwipeMO863479.innerContent')}}
</span>
                          </Col>
                          <Col span="14" style="text-align: right;" addin-id="ColSwipeMO263413">
                              <Button type="text" size="small" click="delSwipe(index)" addin-id="ButtonSwipeMO314298">
                                <Icon type="md-close" addin-id="IconSwipeMO243633"></Icon>
                              </Button>
                          </Col>
                        </Row>
                        <Select class="margin1" v-model="item.imgOri" on-change="switchOrigin(value, index)" addin-id="SelectSwipeMO063002">
                            <Option value="imgBase" addin-id="OptionSwipeMO127519">
{{$t('Swipe.OptionSwipeMO127519.innerContent')}}
</Option>
                            <Option value="imgSelf" addin-id="OptionSwipeMO973596">
{{$t('Swipe.OptionSwipeMO973596.innerContent')}}
</Option>
                        </Select>
                        <Input class="margin1" type="textarea" autosize="true" v-model="item.imgUrl" on-focus="chooseOrigin(item, index)" addin-id="InputSwipeMO370724"/>
                    </div>

                  </div>
                  <div slot="layout" addin-id="divSwipeMO275724">
                  </div>
                  <div slot="operation" addin-id="divSwipeMO024235">
                  </div>
                  
              </EditBox>
          </span>
          <ImgEditModal ref="img_modal" transferImg="getImgUrl" addin-id="ImgEditModalSwipeMO004500"></ImgEditModal>
      </section>
      <section v-else=v-else addinName="name" style="text-align: center" addin-id="sectionSwipeMO116442">
          <span style="text-align:center" addin-id="spanSwipeMO432494">
          <div class="form-addin-icon" addin-id="divSwipeMO174895">
              <i class="iconfont" addin-id="iSwipeMO709875">&#xe6cf;</i>
              </div>
              <div class="form-addin-name" addin-id="divSwipeMO674369">
{{$t('Swipe.divSwipeMO674369.innerContent')}}
</div>
          </span>
      </section>
</template>