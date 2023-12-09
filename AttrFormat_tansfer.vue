<template>
    <div addin-id="divSCAFMO825696">
      <Modal v-model="attrFormat" width="900" mask-closable="false" id="attrFormat" :title="$t('AttrFormat.attrFormat.title')">
        <div addin-id="divSCAFMO611440">
          <Row addin-id="RowSCAFMO240081">
{{$t('AttrFormat.RowSCAFMO240081.innerContent')}}
<Button icon="ios-refresh" shape="circle" size="small" click="clearList" addin-id="ButtonSCAFMO933489"></Button>
              <p style="color: #9ea7b4;" addin-id="pSCAFMO108391">
{{$t('AttrFormat.pSCAFMO108391.innerContent')}}
<1 addin-id="1SCAFMO354994"><2 addin-id="2SCAFMO595558"></2> {{formatMessage}}
          </1>
          <Row addin-id="RowSCAFMO430348">
              <Tag v-for="(item, index) in finallAttrList" key="index" closable=closable size="large" on-close="delAttribute(index)" addin-id="TagSCAFMO765095">
{{$t('AttrFormat.TagSCAFMO765095.innerContent')}}
</Tag>
          </Row>
          <Row type="flex" justify="start" align="middle" addin-id="RowSCAFMO584677">
            <Input class="margin1" v-show="filterQueryType === 'common'" ref="finallFormat" v-model="finallFormat" type="textarea" rows="6" maxlength="100" show-word-limit=show-word-limit addin-id="InputSCAFMO336067" :placeholder="$t('AttrFormat.InputSCAFMO336067.placeholder')"></Input>
          </Row>
          <Row type="flex" justify="center" align="middle" v-show="showAttrPanel" addin-id="RowSCAFMO747133">
              <Collapse v-model="defaultRefOpen" v-if="refClassSwitch" style="width:100%;" addin-id="CollapseSCAFMO156474">
                      <Panel name="1" addin-id="PanelSCAFMO491123">
{{$t('AttrFormat.PanelSCAFMO491123.innerContent')}}
<div slot="content" addin-id="divSCAFMO457024">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO642502">
                            <Col span="8" v-for="(refClassAttribute, index) in showClassAttributes.sys" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO240123">
                              <div class="filterQuery-box" addin-id="divSCAFMO178104">
                                <span title="refClassAttribute.displayName" class="filterQuery-display" addin-id="spanSCAFMO248914">{{refClassAttribute.displayName}}</span>
                                <span title="refClassAttribute.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO594297">{{refClassAttribute.attributeName}}</span>
                                <Button class="filterQuery-add" size="small" click="addAttribute(refClassAttribute.valueType, refClassAttribute.attributeName)" addin-id="ButtonSCAFMO196755">
{{$t('AttrFormat.ButtonSCAFMO196755.innerContent')}}
</Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Panel>
                      <Panel name="2" addin-id="PanelSCAFMO954414">
{{$t('AttrFormat.PanelSCAFMO954414.innerContent')}}
<div slot="content" addin-id="divSCAFMO224145">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO146849">
                            <Col span="8" v-for="(refClassAttribute, index) in showClassAttributes.def" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO236841">
                              <div class="filterQuery-box" addin-id="divSCAFMO561575">
                                <span title="refClassAttribute.displayName" class="filterQuery-display" addin-id="spanSCAFMO481387">{{refClassAttribute.displayName}}</span>
                                <span title="refClassAttribute.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO129791">{{refClassAttribute.attributeName}}</span>
                                <Button class="filterQuery-add" size="small" click="addAttribute(refClassAttribute.valueType, refClassAttribute.attributeName)" addin-id="ButtonSCAFMO477162">
{{$t('AttrFormat.ButtonSCAFMO477162.innerContent')}}
</Button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Panel>
              </Collapse>
              <Collapse v-model="defaultOpen" v-else=v-else style="width:100%;" addin-id="CollapseSCAFMO119066">
                  <Panel name="1" v-if="options.hideRelationClass.indexOf('relation') !== -1" addin-id="PanelSCAFMO733765">
{{$t('AttrFormat.PanelSCAFMO733765.innerContent')}}
<div slot="content" addin-id="divSCAFMO736451">
                      <Collapse v-model="defaultRelationRefOpen" addin-id="CollapseSCAFMO366057">
                      <Panel name="1-1" addin-id="PanelSCAFMO788145">
{{$t('AttrFormat.PanelSCAFMO788145.innerContent')}}
<div slot="content" addin-id="divSCAFMO728344">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO125329">
                          <Col span="8" v-for="(relation, index) in showClassAttributes.relationSys" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO498623">
                              <div class="filterQuery-box" addin-id="divSCAFMO620666">
                              <span title="relation.displayName" class="filterQuery-display" addin-id="spanSCAFMO223863">{{relation.displayName}}</span>
                              <span title="relation.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO331778">{{relation.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(relation.valueType, relation.attributeName, 'relation_')" addin-id="ButtonSCAFMO696575">
{{$t('AttrFormat.ButtonSCAFMO696575.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      <Panel name="1-2" addin-id="PanelSCAFMO353844">
{{$t('AttrFormat.PanelSCAFMO353844.innerContent')}}
<div slot="content" addin-id="divSCAFMO783305">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO805650">
                          <Col span="8" v-for="(relation, index) in showClassAttributes.relationDef" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO319977">
                              <div class="filterQuery-box" addin-id="divSCAFMO900086">
                              <span title="relation.displayName" class="filterQuery-display" addin-id="spanSCAFMO715702">{{relation.displayName}}</span>
                              <span title="relation.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO415258">{{relation.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(relation.valueType, relation.attributeName, 'relation_')" addin-id="ButtonSCAFMO371580">
{{$t('AttrFormat.ButtonSCAFMO371580.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      </Collapse>
                  </div>
                  </Panel>
                  <Panel name="2" v-if="options.hideRelationClass.indexOf('left') !== -1" addin-id="PanelSCAFMO085325">
{{$t('AttrFormat.PanelSCAFMO085325.innerContent')}}
<div slot="content" addin-id="divSCAFMO029453">
                      <Collapse v-model="defaultLeftRefOpen" addin-id="CollapseSCAFMO674541">
                      <Panel name="2-1" addin-id="PanelSCAFMO422998">
{{$t('AttrFormat.PanelSCAFMO422998.innerContent')}}
<div slot="content" addin-id="divSCAFMO934806">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO350172">
                          <Col span="8" v-for="(left, index) in showClassAttributes.leftSys" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO709113">
                              <div class="filterQuery-box" addin-id="divSCAFMO814045">
                              <span title="left.displayName" class="filterQuery-display" addin-id="spanSCAFMO352227">{{left.displayName}}</span>
                              <span title="left.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO830011">{{left.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(left.valueType, left.attributeName, 'left_')" addin-id="ButtonSCAFMO337957">
{{$t('AttrFormat.ButtonSCAFMO337957.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      <Panel name="2-2" addin-id="PanelSCAFMO308959">
{{$t('AttrFormat.PanelSCAFMO308959.innerContent')}}
<div slot="content" addin-id="divSCAFMO734658">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO188075">
                          <Col span="8" v-for="(left, index) in showClassAttributes.leftDef" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO899217">
                              <div class="filterQuery-box" addin-id="divSCAFMO819697">
                              <span title="left.displayName" class="filterQuery-display" addin-id="spanSCAFMO773049">{{left.displayName}}</span>
                              <span title="left.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO419712">{{left.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(left.valueType, left.attributeName, 'left_')" addin-id="ButtonSCAFMO559299">
{{$t('AttrFormat.ButtonSCAFMO559299.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      </Collapse>
                  </div>
                  </Panel>
                  <Panel name="3" v-if="options.hideRelationClass.indexOf('right') !== -1" addin-id="PanelSCAFMO850920">
{{$t('AttrFormat.PanelSCAFMO850920.innerContent')}}
<div slot="content" addin-id="divSCAFMO664274">
                      <Collapse v-model="defaultRightRefOpen" addin-id="CollapseSCAFMO388545">
                      <Panel name="3-1" addin-id="PanelSCAFMO797454">
{{$t('AttrFormat.PanelSCAFMO797454.innerContent')}}
<div slot="content" addin-id="divSCAFMO135576">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO921526">
                          <Col span="8" v-for="(right, index) in showClassAttributes.rightSys" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO557566">
                              <div class="filterQuery-box" addin-id="divSCAFMO794844">
                              <span title="right.displayName" class="filterQuery-display" addin-id="spanSCAFMO446996">{{right.displayName}}</span>
                              <span title="right.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO186975">{{right.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(right.valueType, right.attributeName, 'right_')" addin-id="ButtonSCAFMO056224">
{{$t('AttrFormat.ButtonSCAFMO056224.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      <Panel name="3-2" addin-id="PanelSCAFMO603209">
{{$t('AttrFormat.PanelSCAFMO603209.innerContent')}}
<div slot="content" addin-id="divSCAFMO446328">
                          <Row type="flex" align="middle" justify="start" addin-id="RowSCAFMO027593">
                          <Col span="8" v-for="(right, index) in showClassAttributes.rightDef" key="index" style="attributeBoxStyle" addin-id="ColSCAFMO093502">
                              <div class="filterQuery-box" addin-id="divSCAFMO635228">
                              <span title="right.displayName" class="filterQuery-display" addin-id="spanSCAFMO224464">{{right.displayName}}</span>
                              <span title="right.attributeName" class="filterQuery-attribute" addin-id="spanSCAFMO044071">{{right.attributeName}}</span>
                              <Button class="filterQuery-add" size="small" click="addAttribute(right.valueType, right.attributeName, 'right_')" addin-id="ButtonSCAFMO636981">
{{$t('AttrFormat.ButtonSCAFMO636981.innerContent')}}
</Button>
                              </div>
                          </Col>
                          </Row>
                          </div>
                      </Panel>
                      </Collapse>
                  </div>
                  </Panel>
              </Collapse>
          </Row>
        </p>
        <div slot="footer" addin-id="divSCAFMO154846">
          <Button type="text" click="cancelFormat" addin-id="ButtonSCAFMO324396">
{{$t('AttrFormat.ButtonSCAFMO324396.innerContent')}}
</Button>
          <Button type="primary" click="confirmFinalFormat" id="confirmattrFormatButton">
{{$t('AttrFormat.confirmattrFormatButton.innerContent')}}
</Button>
        </div>
      </Row>
      <Spin fix=fix v-if="spinShow" addin-id="SpinSCAFMO911374"></Spin>
    </div>
  </Modal></div></template>