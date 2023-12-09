<template>
    <div addin-id="divSCICPMO491099">
        <Modal v-model="iconModal" width="800" mask-closable="false" addin-id="ModalSCICPMO091605" :title="$t('IconCommonPanel.ModalSCICPMO091605.title')">
            <Row class="lableTxt" addin-id="RowSCICPMO597282">
                <Col span="4" addin-id="ColSCICPMO522993">
                    <span addin-id="spanSCICPMO000011">
{{$t('IconCommonPanel.spanSCICPMO000011.innerContent')}}
</span>
                </Col>
                <Col span="18" offset="1" addin-id="ColSCICPMO045862">
                    <Input v-model="selfIconLabel" type="textarea" autosize="true" addin-id="InputSCICPMO284046"/>
                </Col>
            </Row>
            <p class="attrTitle" addin-id="pSCICPMO433369">
{{$t('IconCommonPanel.pSCICPMO433369.innerContent')}}
</p>
            <div class="attrBox" addin-id="divSCICPMO930566">
                <van-button size="small" plain=plain v-for="item in iconList" key="item.value" class="check-item" icon="item.value" click="addIconName(item.label)" addin-id="van-buttonSCICPMO358048">{{ item.label }}</van-button>
            </div>
            <div slot="footer" addin-id="divSCICPMO060368">
                <Button type="text" click="iconModal = false" addin-id="ButtonSCICPMO683675">
{{$t('IconCommonPanel.ButtonSCICPMO683675.innerContent')}}
</Button>
                <Button type="primary" click="confirmIcon" addin-id="ButtonSCICPMO993133">
{{$t('IconCommonPanel.ButtonSCICPMO993133.innerContent')}}
</Button>
            </div>
        </Modal>
    </div>
</template>