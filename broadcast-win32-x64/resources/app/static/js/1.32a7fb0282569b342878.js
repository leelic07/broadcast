webpackJsonp([1],{"+Sg3":function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var i,a,o,c,s,l=1,r={},d=!1,u=e.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(e);g=g&&g.setTimeout?g:e,"[object process]"==={}.toString.call(e.process)?i=function(e){t.nextTick(function(){h(e)})}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){h(e.data)},i=function(e){o.port2.postMessage(e)}):u&&"onreadystatechange"in u.createElement("script")?(a=u.documentElement,i=function(e){var t=u.createElement("script");t.onreadystatechange=function(){h(e),t.onreadystatechange=null,a.removeChild(t),t=null},a.appendChild(t)}):i=function(e){setTimeout(h,0,e)}:(c="setImmediate$"+Math.random()+"$",s=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(c)&&h(+t.data.slice(c.length))},e.addEventListener?e.addEventListener("message",s,!1):e.attachEvent("onmessage",s),i=function(t){e.postMessage(c+t,"*")}),g.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var a={callback:e,args:t};return r[l]=a,i(l),l++},g.clearImmediate=m}function m(e){delete r[e]}function h(e){if(d)setTimeout(h,0,e);else{var t=r[e];if(t){d=!0;try{!function(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}(t)}finally{m(e),d=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(t,n("u28U"),n("Wo/5"))},"6Koo":function(e,t,n){(function(e){var i=void 0!==e&&e||"undefined"!=typeof self&&self||window,a=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new o(a.call(setTimeout,i,arguments),clearTimeout)},t.setInterval=function(){return new o(a.call(setInterval,i,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n("+Sg3"),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(t,n("u28U"))},"7/+r":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("34v0"),a=n.n(i),o=n("EcfS"),c=n("6Koo"),s={data:function(){return{pagination:{page:1,per_page:5},datetime:"",merged:"",busy:!0,broadcast:[],mergedOptions:[{value:"",label:"全部记录"},{value:!1,label:"未合并记录"},{value:!0,label:"已合并记录"}],isIndeterminate:!0,checkAll:!1,allRecordingIds:[],checkedRecordingIds:[],checkedBroadcast:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]}}},watch:{deleteRecordingResult:function(){this.broadcast.splice(this.indexForDelete,1),this.getRecordings(this.pagination)},broadcastList:{handler:function(e,t){var n=this;0===e.length?this.busy=!0:(this.broadcast=this.broadcast.concat(e),this.busy=!1,this.broadcast.forEach(function(e){return n.allRecordingIds.push(e.id)}))}},mergeRecordingResult:function(){this.mergeRecording(this.checkedBroadcast)},recordingType:function(){console.log("type change")},datetime:function(e){e?(this.pagination.start_time=e[0],this.pagination.end_time=e[1]):(delete this.pagination.start_time,delete this.pagination.end_time)},merged:function(e){""!==e?this.pagination.merged=e:delete this.pagination.merged}},computed:a()({},Object(o.c)({broadcastList:"broadcastList",deleteRecordingResult:"deleteRecordingResult",loading:"loading",mergeRecordingResult:"mergeRecordingResult"})),methods:a()({},Object(o.b)({getRecordings:"getRecordings",deleteBroadcast:"deleteBroadcast",sendRecordingIds:"sendRecordingIds"}),Object(o.d)({logout:"logout",mergeRecording:"mergeRecording"}),{editBroadcast:function(e){this.$router.push({path:"/broadcast/edit/"+e})},logoutConfirm:function(){var e=this;this.$confirm("确定退出登录？","提示",{type:"warning"}).then(function(){e.logout()}).catch(function(e){return console.log(e)})},deleteBroadcastConfirm:function(e,t){var n=this;this.$confirm("确定删除该语音？","提示",{type:"warning"}).then(function(){n.indexForDelete=t,n.deleteBroadcast(e)}).catch(function(e){return console.log(e)})},loadMore:function(){var e=this;this.busy=!0,Object(c.setTimeout)(function(){e.pagination.page++,e.getRecordings(e.pagination)},1200)},handleCheckAllChange:function(e){this.checkedRecordingIds=e?this.allRecordingIds:[],this.isIndeterminate=!1},handleCheckedRecordingChange:function(e){var t=e.length;this.checkAll=t===this.allRecordingIds.length,this.isIndeterminate=t>0&&t<this.allRecordingIds.length},mergeRecordingConfirm:function(){var e=this;this.$confirm("确定合并选中的记录？","提示",{type:"warning"}).then(function(){e.broadcast.forEach(function(t){e.checkedRecordingIds.forEach(function(n){n===t.id&&e.checkedBroadcast.push(t)})}),e.checkedBroadcast.length&&e.sendRecordingIds(e.checkedRecordingIds)}).catch(function(e){return console.log(e)})},searchRecordings:function(){this.broadcast.splice(0),this.pagination.page=1,this.getRecordings(this.pagination)}}),mounted:function(){this.getRecordings(this.pagination)}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-row",{staticClass:"broadcast-container"},[n("el-col",[n("el-button",{attrs:{type:"text"},on:{click:e.logoutConfirm}},[e._v("\n      退出登录\n      "),n("i",{staticClass:"iconfont icon-tuichu"})]),e._v(" "),n("el-card",[n("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),n("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-menu",disabled:e.checkedRecordingIds.length<2},on:{click:e.mergeRecordingConfirm}},[e._v("合并记录")]),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:e.searchRecordings}},[e._v("搜索记录")]),e._v(" "),n("el-date-picker",{attrs:{size:"small",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions,"value-format":"yyyy-MM-dd"},model:{value:e.datetime,callback:function(t){e.datetime=t},expression:"datetime"}}),e._v(" "),n("el-select",{attrs:{size:"small"},model:{value:e.merged,callback:function(t){e.merged=t},expression:"merged"}},e._l(e.mergedOptions,function(e,t){return n("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),n("el-checkbox-group",{on:{change:e.handleCheckedRecordingChange},model:{value:e.checkedRecordingIds,callback:function(t){e.checkedRecordingIds=t},expression:"checkedRecordingIds"}},e._l(e.broadcast,function(t,i){return n("el-card",{key:i,staticClass:"box-card"},[n("el-col",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("el-col",{attrs:{span:20}},[n("el-checkbox",{key:t.timestamp,attrs:{label:t.id}},[e._v("选择")]),e._v(" "),n("el-tag",[n("h3",[n("i",{staticClass:"el-icon-time"}),e._v("\n              "+e._s(e._f("Date")(t.timestamp))+"\n            ")])])],1),e._v(" "),n("el-col",{attrs:{span:4}},[n("el-button",{attrs:{type:"primary",plain:"",size:"small",icon:"el-icon-edit"},on:{click:function(n){e.editBroadcast(t.id)}}},[e._v("编辑语音")])],1)],1),e._v(" "),n("el-col",[n("el-col",{attrs:{span:20}},[n("p",{staticClass:"broadcast-content"},[e._v(e._s(t.content||"暂无内容"))])]),e._v(" "),n("el-col",{attrs:{span:20}},[n("audio",{attrs:{src:e.$_baseURL+t.filename,controls:""}},[e._v("\n            您的浏览器不支持播放音频文件\n          ")])]),e._v(" "),n("el-col",{attrs:{span:4}},[n("el-button",{attrs:{type:"text",icon:"el-icon-delete",size:"mini"},on:{click:function(n){e.deleteBroadcastConfirm(t.id,i)}}},[e._v("删除语音")])],1)],1)],1)})),e._v(" "),n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:e.loadMore,expression:"loadMore"},{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"30"}})],1)},staticRenderFns:[]},r=n("Aizv")(s,l,!1,null,null,null);t.default=r.exports}});
//# sourceMappingURL=1.32a7fb0282569b342878.js.map