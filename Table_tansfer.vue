<template>
  <section v-if="t_preview" draggable="args.draggable" addinName="name" ref="main" style="{'width': arg_width, 'display': 'flex', 'flex-direction': 'column', 'height': arg_height,'float': 'left'}" addin-id="sectionTableMO843836">

      <div class="vtable" style="{'background-color': '#fff',width:'100%','height': arg_inside_height,}" addin-id="divTableMO289289">
        <div class="head-tab" style="{
          'min-height': arg_head_height + 'px',
          'height': arg_head_height + 'px',
          'background-color': args.header_color,
          'border-bottom': '1px solid #e8eaec'}" addin-id="divTableMO523829">
          <div class="head-cell" v-if="args.rowSelection" style="{'min-height': arg_head_height + 'px',
          'height': arg_head_height + 'px',
          'min-width': '30px',
          'max-width': '30px',
          'width': '30px',
          'font-size': args_hfsize,
          'color':args.head_fontColor,
          'background-color': args.header_color,
          'display': 'table-cell',
          'vertical-align': YAlign,
          'text-align':XAlign}" addin-id="divTableMO313927">
            <van-checkbox icon-size="16px" shape="square" addin-id="van-checkboxTableMO510115"></van-checkbox>
          </div>
          <div class="head-cell" v-for="(item, index) in args.columnDefs" key="index" click="colSetAction(item, index)" style="{'min-height': arg_head_height + 'px',
          'height': arg_head_height + 'px',
          'min-width': args_finalColWidth(item),
          'max-width': args_finalColWidth(item),
          'width': args_finalColWidth(item),
          'font-size': args_hfsize,
          'color':args.head_fontColor,
          'display': 'table-cell',
          'background-color': args.header_color,
          'vertical-align': YAlign,
          'text-align':XAlign}" addin-id="divTableMO826119">

            <van-icon name="edit" addin-id="van-iconTableMO430701"></van-icon>
                {{ item.headerName }}
          </div>
        </div>
        <div v-for="(cell, cindex) in rowData" key="cindex" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px',
          'background-color':args.stripe && cindex % 2 == 0?'#fff': args.contentbg_color,
          'border-bottom': '1px solid #e8eaec'}" addin-id="divTableMO100715">
             <div v-if="args.rowSelection" class="table-column" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px','min-width': '30px', 'width': '30px'}" addin-id="divTableMO567671">
              <div class="cell" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px',
              'max-width': '30px',
              'width': '30px',
              'font-size': args_cfsize,
              'color':args.content_fontColor,
              'background-color':args.stripe && cindex % 2 == 0?'#fff': args.contentbg_color,
              'display': 'table-cell',
              'vertical-align': YAlign,
              'text-align':XAlign}" addin-id="divTableMO046690">
                <van-checkbox icon-size="14px" shape="square" addin-id="van-checkboxTableMO911684"></van-checkbox>
              </div>
            </div>
            <div class="table-column" v-for="(item, index) in args.columnDefs" key="index" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px','min-width': args_finalColWidth(item),
            'width': args_finalColWidth(item)}" addin-id="divTableMO835876">
                <div v-if="item.field=='_SNColumn'" class="cell" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px',
                'max-width': args_finalColWidth(item),
                'width': args_finalColWidth(item),
                'font-size': args_cfsize,
                'color':args.content_fontColor,
                'background-color':args.stripe && cindex % 2 == 0?'#fff': args.contentbg_color,
                'display': 'table-cell',
                'vertical-align': YAlign,
                'text-align':XAlign}" addin-id="divTableMO020222">{{cindex + 1}}</div>
                <div class="cell" v-else-if="cell[item.field] || cell[item.field]==false" style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px',
                'max-width': args_finalColWidth(item),
                'width': args_finalColWidth(item),
                'font-size': args_cfsize,
                'color':args.content_fontColor,
                'background-color':args.stripe && cindex % 2 == 0?'#fff': args.contentbg_color,
                'display': 'table-cell',
                'vertical-align': YAlign,
                'text-align':XAlign}" addin-id="divTableMO622628">
                  {{ renderContent(cell[item.field], item)}}
                </div>
                <div class="cell" v-else=v-else style="{'min-height': arg_line_height + 'px', 'height': arg_line_height + 'px',
                'max-width': args_finalColWidth(item),
                'width': args_finalColWidth(item),
                'font-size': args_cfsize,
                'color':args.content_fontColor,
                'background-color':args.stripe && cindex % 2 == 0?'#fff': args.contentbg_color,
                'display': 'table-cell',
                'vertical-align': YAlign,
                'text-align':XAlign}" addin-id="divTableMO946544">&nbsp;</div>
            </div>
        </div>
      </div>
    <div style="margin-top: 5px; " v-show="args.pageable" addin-id="divTableMO025587">
      <van-pagination items-per-page="arg_page_size" total-items="entryCount" v-model="currentPage" mode="simple" addin-id="van-paginationTableMO450431"></van-pagination>
    </div>

    <slot name="widget-footer" addin-id="slotTableMO567530"></slot>
<span v-show="t_edit" ref="edit" addin-id="spanTableMO553767">

      <EditBox v-if="actEdit" addinName="name" widgetAnnotation="widgetAnnotation" editExtendInfo="editExtendInfo" ref="editbox" v-model="args" itemValue="itemValue" router="router" route="route" root="root" store="store" query_oprs="query_oprs" targetclass="itemValue.data.targetClass" handleBindTargetClassChange="handleBindTargetClassChange" addin-id="EditBoxTableMO235624">

        <div slot="attribute" addin-id="divTableMO230843">
          <Row class="margin1" addin-id="RowTableMO303038">
            <Col span="24" style="text-align: center" addin-id="ColTableMO169323">
              <Button type="primary" style="text-align: center; width: 90%" click="openChooseCols" loading="openGridAttributesLoading" addin-id="ButtonTableMO903627">
{{$t('Table.ButtonTableMO903627.innerContent')}}
</Button>
            </Col>
            
          </Row>
          <Row class="margin1" addin-id="RowTableMO325504">
            
            
            
            <Col span="12" class="margin1" addin-id="ColTableMO442863">
              <Checkbox v-model="args.SNCol" on-change="initSNCol" addin-id="CheckboxTableMO030614">
{{$t('Table.CheckboxTableMO030614.innerContent')}}
</Checkbox>
            </Col>
            <Col span="12" class="margin1" addin-id="ColTableMO702503">
              <Checkbox v-model="args.compactMode" addin-id="CheckboxTableMO443972">
{{$t('Table.CheckboxTableMO443972.innerContent')}}
</Checkbox>
            </Col>
            <Col span="12" class="margin1" addin-id="ColTableMO079884">
              <Checkbox v-model="args.pageable" addin-id="CheckboxTableMO842936">
{{$t('Table.CheckboxTableMO842936.innerContent')}}
</Checkbox>
            </Col>
            <Col span="12" class="margin1" addin-id="ColTableMO590646">
              <Checkbox v-model="args.rowSelection" addin-id="CheckboxTableMO428020">
{{$t('Table.CheckboxTableMO428020.innerContent')}}
</Checkbox>
            </Col>
          </Row>
          <div v-if="showTargetClass" class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO207849">
{{$t('Table.divTableMO207849.innerContent')}}
<i-switch style="float: right" v-model="args.openReturnAttr" addin-id="i-switchTableMO354092"/>
            <Row class="margin1" v-show="args.openReturnAttr" addin-id="RowTableMO146633">
              <Col span="24" style="text-align: center" addin-id="ColTableMO243942">
                <Button type="primary" style="text-align: center; width: 100%" click="openChooseReturnAttr" addin-id="ButtonTableMO379237">
{{$t('Table.ButtonTableMO379237.innerContent')}}
</Button>
              </Col>
            </Row>
          </div>
          <Row class="margin1" align="middle" type="flex" v-show="args.pageable" addin-id="RowTableMO491218">
              <Col span="5" addin-id="ColTableMO943972"><span addin-id="spanTableMO678108">
{{$t('Table.spanTableMO678108.innerContent')}}
</span></Col>
              <Col span="1" addin-id="ColTableMO181024"></Col>
              <Col span="18" addin-id="ColTableMO527847">
                <InputNumber type="number" v-model="args.pageSize" min="1" max="10000000000" style="width: 100%;" addin-id="InputNumberTableMO014994">
                </InputNumber>
              </Col>
          </Row>
          <Row class="margin1" addin-id="RowTableMO381809">
            <Col span="24" class="margin1" addin-id="ColTableMO479170">
              <Input type="number" v-model="args.headRowHeight" addin-id="InputTableMO392112">
                <span slot="prepend" addin-id="spanTableMO718184">
{{$t('Table.spanTableMO718184.innerContent')}}
</span>
              </Input>
            </Col>
          </Row>
          <Row class="margin1" addin-id="RowTableMO909902">
            <Col span="24" class="margin1" addin-id="ColTableMO187982">
              <Input type="number" v-model="args.rowHeight" on-change="adjustRowHeight(args.rowHeight)" addin-id="InputTableMO588802">
                <span slot="prepend" addin-id="spanTableMO208108">
{{$t('Table.spanTableMO208108.innerContent')}}
</span>
              </Input>
            </Col>
          </Row>
        </div>
        <div slot="layout" addin-id="divTableMO796977">
          
        <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO233332">
{{$t('Table.divTableMO233332.innerContent')}}
<ColorPicker v-model="args.header_color" addin-id="ColorPickerTableMO310988"/>
        </div>
        <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO076575">
{{$t('Table.divTableMO076575.innerContent')}}
<ColorPicker v-model="args.head_fontColor" addin-id="ColorPickerTableMO338279"/>
        </div>
        <p class="margin1" addin-id="pTableMO127846">
{{$t('Table.pTableMO127846.innerContent')}}
</p>
        <Input class="margin1" v-model="args.hfsize" type="number" addin-id="InputTableMO592434">
          <Select v-model="args.hfsizeType" slot="append" style="width: 70px;" addin-id="SelectTableMO226582">
            <Option value="px" addin-id="OptionTableMO070864">px</Option>
            <Option value="rem" addin-id="OptionTableMO052728">rem</Option>
          </Select>
        </Input>
        <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO442077">
{{$t('Table.divTableMO442077.innerContent')}}
<ColorPicker v-model="args.contentbg_color" addin-id="ColorPickerTableMO596780"/>
        </div>
        <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO175383">
{{$t('Table.divTableMO175383.innerContent')}}
<ColorPicker v-model="args.content_fontColor" addin-id="ColorPickerTableMO134636"/>
        </div>
        <p class="margin1" addin-id="pTableMO942526">
{{$t('Table.pTableMO942526.innerContent')}}
</p>
        <Input class="margin1" v-model="args.cfsize" type="number" addin-id="InputTableMO265119">
          <Select v-model="args.cfsizeType" slot="append" style="width: 70px;" addin-id="SelectTableMO795365">
            <Option value="px" addin-id="OptionTableMO786419">px</Option>
            <Option value="rem" addin-id="OptionTableMO076571">rem</Option>
          </Select>
        </Input>
        <p class="margin1" addin-id="pTableMO493888">
{{$t('Table.pTableMO493888.innerContent')}}
</p>
          <div style="text-align: center" addin-id="divTableMO254470">
            <Button type="args.globalAlignCode == 0 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 0" addin-id="ButtonTableMO292832"></Button>
            <Button type="args.globalAlignCode == 3 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 3" addin-id="ButtonTableMO744050"></Button>
            <Button type="args.globalAlignCode == 6 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 6" addin-id="ButtonTableMO627546"></Button>
          </div>
          <div style="text-align: center " addin-id="divTableMO802130">
            <Button type="args.globalAlignCode == 1 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 1" addin-id="ButtonTableMO551194"></Button>
            <Button type="args.globalAlignCode == 4 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 4" addin-id="ButtonTableMO982309"></Button>
            <Button type="args.globalAlignCode == 7 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 7" addin-id="ButtonTableMO885194"></Button>
          </div>
          <div style="text-align: center" addin-id="divTableMO182381">
            <Button type="args.globalAlignCode == 2 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 2" addin-id="ButtonTableMO879862"></Button>
            <Button type="args.globalAlignCode == 5 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 5" addin-id="ButtonTableMO306422"></Button>
            <Button type="args.globalAlignCode == 8 ? 'primary' : 'default'" style="height: 20px; width: 20px;padding: 0;margin-top:0px;" click="args.globalAlignCode = 8" addin-id="ButtonTableMO067204"></Button>
          </div>
          <div class="margin1" style="margin: 10px 0 10px 0" addin-id="divTableMO486249">
{{$t('Table.divTableMO486249.innerContent')}}
<i-switch style="float: right" v-model="args.stripe" on-change="changeStripe" addin-id="i-switchTableMO712964"/>
          </div>
          <div slot="operation" addin-id="divTableMO859064">
        </div>
        </div>
      </EditBox>

      <Modal v-model="chooseCols" on-ok="initColumnDefinition" on-cancel="cancelColumnDefs" addin-id="ModalTableMO133297" :title=$t('Table.ModalTableMO133297.title')>
        <h2 addin-id="h2TableMO476981">
{{$t('Table.h2TableMO476981.innerContent')}}
</h2>
        <hr addin-id="hrTableMO333353"/>
        <div v-if="args.targetClassType != 'relation'" addin-id="divTableMO296587">
          <h3 style="display: inline-block;margin-right: 20px" addin-id="h3TableMO230626">
{{$t('Table.h3TableMO230626.innerContent')}}
</h3>
          <Input search=search v-model="handleAttrSearchEntity" on-change="$event = addin-id=" InputTableMO234307=InputTableMO234307 "> {handleAttrSearch($event, 'entity')}"="> {handleAttrSearch($event, 'entity')}" style="width: 200px; margin: 5px" :placeholder=null/>
          <CheckboxGroup v-model="args.selected_attributes" on-change="$event = addin-id=" CheckboxGroupTableMO164136=CheckboxGroupTableMO164136>
            <Collapse v-model="targetClassAttributesCollapse" addin-id="CollapseTableMO857002">
              <Panel name="sys" addin-id="PanelTableMO030925">
{{$t('Table.PanelTableMO030925.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_sys" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; vertical-align:bottom;" addin-id="CheckboxTableMO780342">{{ item.displayName }}</Checkbox>
              </Panel>
              <Panel name="def" addin-id="PanelTableMO280067">
{{$t('Table.PanelTableMO280067.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_def" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; vertical-align:bottom;" addin-id="CheckboxTableMO528157">{{ item.displayName }}</Checkbox>
              </Panel>
            </Collapse>
          </CheckboxGroup>
          <hr addin-id="hrTableMO114589"/>
          <div class="margin1" addin-id="divTableMO653308">
             <Checkbox indeterminate="select_all_attributes.entity.indeterminate" value="select_all_attributes.entity.status" click=click prevent=prevent native="($event) = addin-id=" CheckboxTableMO703237=CheckboxTableMO703237>全选</Checkbox>
          </div>
        </div>
        <div v-else=v-else addin-id="divTableMO296878">
          <h3 style="display: inline-block;margin-right: 20px" addin-id="h3TableMO097867">
{{$t('Table.h3TableMO097867.innerContent')}}
</h3>
          <Input icon="md-search" v-model="handleAttrSearchLeft" on-change="$event = addin-id=" InputTableMO512475=InputTableMO512475 "> {handleAttrSearch($event, 'left')}"="> {handleAttrSearch($event, 'left')}" style="width: 200px; margin: 5px" :placeholder=null/>
          <CheckboxGroup v-model="args.selected_attributes.left" on-change="$event = addin-id=" CheckboxGroupTableMO925560=CheckboxGroupTableMO925560>
            <Collapse v-model="targetClassAttributesLeftCollapse" addin-id="CollapseTableMO637884">
              <Panel name="sys" addin-id="PanelTableMO118536">
{{$t('Table.PanelTableMO118536.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_leftSys" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO562680">{{ item.displayName }}</Checkbox>
              </Panel>
              <Panel name="def" addin-id="PanelTableMO712578">
{{$t('Table.PanelTableMO712578.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_leftDef" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO316780">{{ item.displayName }}</Checkbox>
              </Panel>
            </Collapse>
          </CheckboxGroup>
          <div class="margin1" addin-id="divTableMO814529">
             <Checkbox indeterminate="select_all_attributes.left.indeterminate" value="select_all_attributes.left.status" click=click prevent=prevent native="($event) = addin-id=" CheckboxTableMO512283=CheckboxTableMO512283>全选</Checkbox>
          </div>
          <hr addin-id="hrTableMO904137"/>
          <h3 style="display: inline-block;margin-right: 20px" addin-id="h3TableMO755000">
{{$t('Table.h3TableMO755000.innerContent')}}
</h3>
          <Input icon="md-search" v-model="handleAttrSearchRelation" on-change="$event = addin-id=" InputTableMO554568=InputTableMO554568 "> {handleAttrSearch($event, 'relation')}"="> {handleAttrSearch($event, 'relation')}" style="width: 200px; margin: 5px" :placeholder=null/>
          <CheckboxGroup v-model="args.selected_attributes.relation" on-change="$event = addin-id=" CheckboxGroupTableMO369604=CheckboxGroupTableMO369604>
            <Collapse v-model="targetClassAttributesRelationCollapse" addin-id="CollapseTableMO480920">
              <Panel name="sys" addin-id="PanelTableMO956174">
{{$t('Table.PanelTableMO956174.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_relationSys" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO917341">{{ item.displayName }}</Checkbox>
              </Panel>
              <Panel name="def" addin-id="PanelTableMO492154">
{{$t('Table.PanelTableMO492154.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_relationDef" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO794823">{{ item.displayName }}</Checkbox>
              </Panel>
            </Collapse>
          </CheckboxGroup>
          <div class="margin1" addin-id="divTableMO090668">
             <Checkbox indeterminate="select_all_attributes.relation.indeterminate" value="select_all_attributes.relation.status" click=click prevent=prevent native="($event) = addin-id=" CheckboxTableMO224445=CheckboxTableMO224445>全选</Checkbox>
          </div>
          <hr addin-id="hrTableMO210742"/>
          <h3 style="display: inline-block;margin-right: 20px" addin-id="h3TableMO815513">
{{$t('Table.h3TableMO815513.innerContent')}}
</h3>
          <Input icon="md-search" v-model="handleAttrSearchRight" on-change="$event = addin-id=" InputTableMO853294=InputTableMO853294 "> {handleAttrSearch($event, 'right')}"="> {handleAttrSearch($event, 'right')}" style="width: 200px; margin: 5px" :placeholder=null/>
          <CheckboxGroup v-model="args.selected_attributes.right" on-change="$event = addin-id=" CheckboxGroupTableMO377647=CheckboxGroupTableMO377647>
            <Collapse v-model="targetClassAttributesRightCollapse" addin-id="CollapseTableMO192094">
              <Panel name="sys" addin-id="PanelTableMO275053">
{{$t('Table.PanelTableMO275053.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_rightSys" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO872487">{{ item.displayName }}</Checkbox>
              </Panel>
              <Panel name="def" addin-id="PanelTableMO813818">
{{$t('Table.PanelTableMO813818.innerContent')}}
<Checkbox slot="content" v-for="item in filter_targetClassAttributes_rightDef" key="item.id" label="item.attributeName" style="width: 30%; margin: 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" addin-id="CheckboxTableMO363140">{{ item.displayName }}</Checkbox>
              </Panel>
            </Collapse>
          </CheckboxGroup>
          <div class="margin1" addin-id="divTableMO980679">
             <Checkbox indeterminate="select_all_attributes.right.indeterminate" value="select_all_attributes.right.status" click=click prevent=prevent native="($event) = addin-id=" CheckboxTableMO942825=CheckboxTableMO942825>全选</Checkbox>
          </div>
          <hr addin-id="hrTableMO071365"/>
        </div>
      </Modal>


    <ColumnConfig ref="columnConfig" v-show="ColumnConfigShow" store="store" all_class="all_class" all_relations="all_relations" all_intEntities="all_intEntities" all_extEntities="all_extEntities" args="args" root="root" itemValue="itemValue" applyColumnConfig="applyColumnConfig" addin-id="ColumnConfigTableMO325691"></ColumnConfig>

    </span>
  </section>

  <section v-else=v-else addinName="name" addin-id="sectionTableMO685245">
    <span style="text-align:center" addin-id="spanTableMO802326">
            <div class="form-addin-icon" addin-id="divTableMO293881">
                <i class="iconfont" addin-id="iTableMO199485">&#xe637;</i>
      </div>
      <div class="form-addin-name" style="width: 100%" addin-id="divTableMO682236">
{{$t('Table.divTableMO682236.innerContent')}}
</div>
    </span>
  </section>
</template>