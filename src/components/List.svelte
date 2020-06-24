<style type="text/scss">
    @import './src/styles/vars.scss';
    .list{
        @apply flex flex-col absolute p-6 top-1/2 left-1/2 bg-gray;
        width: 800px;
        transform: translate(-50%, -50%);
        @media (max-width: 768px) {
            width: 100%;
        }
    }
</style>

<div class="list">
    <slot></slot>
</div>