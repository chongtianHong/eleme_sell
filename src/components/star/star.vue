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
    .star-item{ // 表示每个span的基础class
        display: inline-block;
        background-repeat: no-repeat
    }
    &.star-48{ //与star同级
        .star-item{
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
        }
        &:last-child{
            margin-right: 0;
        }
        &.on{
            background: url('star48_on@2x.png');
        }
        &.half{
            background: url('star48_half@2x.png');
        }
        &.off{
            background: url('star48_off@2x.png');
        }
    }
    &.star-36{
        
    }
    &.star-24{
        
    }
    
}
</style>
