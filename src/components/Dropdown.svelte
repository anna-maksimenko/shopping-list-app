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

    function selectEventHandler(){
        showDropdown = !showDropdown;
    }

    function selectionHandler(value, e) {
        selectedValue = value;
    }

</script>

<svelte:window on:click={dropdownHide}/>

<style type="text/scss">
    .dropdown{
        @apply relative block w-full;
        
        &__area-selected, &__area-expanded{
            background-color: rgba(188, 252, 233, 1);
            box-shadow: 5px 5px 10px #a9e3d2, -5px -5px 10px #cfffff, inset 0px 0px 4px rgba(255, 255, 255, 0.2), inset 5px 5px 10px rgba(55, 84, 170, 0), inset -5px -5px 10px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0);
            padding: 7px;
        }
        &__area-selected{
            @apply relative flex flex-row items-center justify-center;
        }
        &__arrow-icon{
            width: 13px;
            height: 13px;
            margin-left: 13px;
            @apply ease-linear duration-500 pointer-events-none;
            &--rotated{
                transform: rotate(90deg);
            }
        }
        &__area-expanded{
             @apply absolute w-full z-10 mt-2;
        }
    }
</style>


<div class="dropdown">
    <div class="dropdown__area-selected" on:click={selectEventHandler} bind:this={select}>{selectedValue}
        <div class="dropdown__arrow-icon" class:dropdown__arrow-icon--rotated={showDropdown}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                        <path d="M506.157,132.386c-7.803-7.819-20.465-7.831-28.285-0.029l-207.73,207.299c-7.799,7.798-20.486,7.797-28.299-0.015
                            L34.128,132.357c-7.819-7.803-20.481-7.79-28.285,0.029c-7.802,7.819-7.789,20.482,0.029,28.284l207.701,207.27
                            c11.701,11.699,27.066,17.547,42.433,17.547c15.358,0,30.719-5.846,42.405-17.533L506.128,160.67
                            C513.946,152.868,513.959,140.205,506.157,132.386z"/>
                    </g>
                </g>
            </svg>
        </div>
    </div>
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