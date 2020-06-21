<style type="text/scss">
    @import './src/styles/vars.scss';
    .list{
        @apply flex flex-col py-10;
        background-color: $mainColor; 
        max-width: 600px;
    }
</style>

<div class="list">
    <slot></slot>
</div>