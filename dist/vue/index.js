export default{props:{columnNumbers:{type:Boolean,default:!0},columnBorders:{type:Boolean,default:!0},visible:{type:Boolean,default:!1}},render(e){return this.computedVisible?e("div",{ref:"griddle",class:["griddle-container"],attrs:{"data-column-numbers":this.columnNumbers,"data-column-borders":this.columnBorders}},new Array(this.numberOfColumns).fill("").map((t,i)=>e("div",{key:i,class:["griddle-column"]}))):null},data:()=>({internalVisible:!1,numberOfColumns:0,tickInterval:null}),computed:{computedVisible(){return this.visible||this.internalVisible}},watch:{visible:{immediate:!0,handler(){this.internalVisible=this.visible,this.renderGriddle()}}},mounted(){window.addEventListener("keyup",e=>{e.ctrlKey&&e.shiftKey&&76===e.which&&(this.internalVisible=!this.internalVisible,this.renderGriddle())}),window.addEventListener("resize",()=>{this.setScrollbarWidth()}),this.setScrollbarWidth()},methods:{countColumns(){Object.keys(this.$refs).length&&this.$refs.griddle&&(this.numberOfColumns=getComputedStyle(this.$refs.griddle).gridTemplateColumns.split(" ").length)},setScrollbarWidth(){document.documentElement.style.setProperty("--scrollbar-width",window.innerWidth-document.documentElement.clientWidth+"px")},renderGriddle(){this.$emit("toggle",this.internalVisible),this.computedVisible?(this.$nextTick(()=>{this.countColumns()}),this.tickInterval=setInterval(()=>{this.countColumns()},1e3)):clearInterval(this.tickInterval)}}};