<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'star',
    props: { // 从外层接收两个参数，size和score。
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType () {
            return "star-" + this.size;
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/styles">
.star{
    font-size: 0;
    .star-item{
        display: inline-block;
        background-repeat: no-repeat
    }
    &.star-48{

    }
    &.star-36{
        
    }
    &.star-24{
        
    }
    
}
</style>
