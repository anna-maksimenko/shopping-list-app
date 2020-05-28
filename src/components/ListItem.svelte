<script>
    // your script goes here
    export let text;
    export let id;
</script>

<style type="text/scss">
@import './src/styles/vars.scss';
    /* your styles go here */
    .list-item{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
    }
</style>

<!-- markup (zero or more items) goes here -->
<div class="list-item">
    <div class="list-item__check">
        <input type="checkbox" name={`checkbox-${id}`}>
    </div>
    <div class="list-item__name">
        <p>{text}</p>
    </div>
    <div class="list-item__quantity">
        <input type="number" name={`quantity-${id}`}/>
    </div>
</div>