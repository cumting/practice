import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Mix from "components/Mix"
import {hello} from "components/Dataimport"

var hungry = "hippo";
console.log(
hello( hungry ).toUpperCase()
);
Vue.config.optionMergeStrategies.filters = function (parent, child, vm) {
  return [parent,child,vm]
}
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  },
  components:{
  	Mix
  }
})
Vue.component('Mycom',{
	template:'<div>公共组件</div>'
})
var vm=new Vue({
	el: '#app',
template: '<App/>',
components: { App },
store,
router,

})

