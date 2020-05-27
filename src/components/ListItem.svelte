<script>
    // your script goes here
    export let text;
    export let id;
</script>

<style>
    /* your styles go here */
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