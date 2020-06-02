<script>
    // your script goes here
</script>

<style type="text/scss">
@import './src/styles/vars.scss';
    /* your styles go here */
    .list{
        @apply flex flex-col py-10;
        background-color: $mainColor; 
        max-width: 600px;
    }
</style>

<!-- markup (zero or more items) goes here -->
<div class="list">
    <slot></slot>
</div>