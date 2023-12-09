<template>
    <div style="{'height': height, 'overflow-y': 'auto'}" id="divHelp403403">
      <div class="home" id="divHelp359041">
        <div class="[oversize ? 'hidden': '']" id="divHelp580056">
          <img src="homePage" alt="" id="imgHelp515636"/>
        </div>
        <div class="home-content" id="divHelp291510">
          <div class="home-card" v-for="(module, index) in homeData" id="divHelp642330">
            <div class="home-card-index" id="divHelp890396">
              <img src="module.indexPic" alt="" id="imgHelp965677"/>
            </div>
            <p class="home-card-title" id="pHelp263724">{{ module.title }}</p>
            <p class="home-card-description" id="pHelp037225">{{ module.description }}</p>
            <Button class="home-card-button" disabled="module.disabled" click="goToModule(module.type)" id="ButtonHelp199337">
              <span id="spanHelp659409">
{{$t('Help.spanHelp659409.innerContent')}}
</span>
            </Button>
          </div>
        </div>
      </div>
      
      
    </div>
  </template>