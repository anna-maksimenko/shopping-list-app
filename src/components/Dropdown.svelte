<script>
    import ArrowDownIcon from '../components/icons/ArrowDownIcon.svelte';

    export let dropdownData;
    export let selectedValue;

    let showDropdown = false;
    let select;

    function dropdownShow() {
        showDropdown = true;
    }
    function dropdownHide(e) {
        if (e.target !== select) {
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
    @import './src/styles/mixins.scss';
    @import './src/styles/vars.scss';
    .dropdown{
        @apply relative block w-full;
        
        &__area-selected, &__area-expanded{
            @include flat-box-shadow;
            @include dropdown-font;
            @apply tracking-widest text-base bg-gray;
        }
        &__area-selected{
            @apply relative flex flex-row items-center justify-center rounded-full p-sm;
        }
        &__arrow-icon{
            margin-left: 8px;
            @apply w-3 ease-linear duration-500 pointer-events-none;
            &--rotated{
                transform: rotate(90deg);
            }
            :global(svg){
                @apply w-full;
            }
            @media (max-width: 640px) {
                @apply w-2;
            }
        }
        &__area-expanded{
            @apply absolute w-full z-10 mt-2 rounded-l-large rounded-r-large py-md;
        }
        &__content li{
            @apply py-sm px-lg;
            p{
                transition: all 0.5s ease;
                &:hover{
                color: $highlightColor;
                }
            }
        }
    }
</style>

<div class="dropdown">
    <div class="dropdown__area-selected" on:click={selectEventHandler} bind:this={select}>{selectedValue}
        <div class="dropdown__arrow-icon" class:dropdown__arrow-icon--rotated={showDropdown}>
            <ArrowDownIcon/>
        </div>
    </div>
    {#if showDropdown}
        <div class="dropdown__area-expanded">
            <ul class="dropdown__content">
                {#each dropdownData as {name}}
                    <li on:click={selectionHandler.bind(this, name)}>
                        <span>{name}</span>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>