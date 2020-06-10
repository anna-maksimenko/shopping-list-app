<script>
    // your script goes here
    export let dropdownData;
    export let selectedValue;
    let showDropdown = false;
    let select;

    function dropdownShow() {
        showDropdown = true;
    }
    function dropdownHide(e) {
        if (e.target!==select) {
            showDropdown = false;
        }
    }

    function selectionHandler(value, e) {
        selectedValue = value;
    }

</script>

<svelte:window on:click={dropdownHide}/>

<style type="text/scss">
    .dropdown{
        @apply  block w-full h-4;
        &__area-selected{
            background-color: #fff;
            width: auto;
            height: 20px;
        }
    }
</style>


<div class="dropdown">
    <div class="dropdown__area-selected" on:click={dropdownShow} bind:this={select}>{selectedValue}</div>
    {#if showDropdown}
        <div class="dropdown__area-expanded">
            <ul class="dropdown__content">
                {#each dropdownData as {name}}
                    <li on:click={selectionHandler.bind(this, name)}>
                        {name}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>