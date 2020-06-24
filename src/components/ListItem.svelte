<script>
    import { createEventDispatcher } from 'svelte'; 

    import { productMeasure } from '../globals.js';
    import Dropdown from '../components/Dropdown.svelte';
    import CrossIcon from '../components/icons/CrossIcon.svelte';
    import AddIcon from '../components/icons/AddIcon.svelte';
    
    export let text;
    export let id = -1;
    export let enabled = false;
    export let measure;
    export let editable = false;
    export let quantity = 0;

    const dispatch = createEventDispatcher();
    
    function checkboxHandler() {
        enabled = !enabled;
    }

    function removeBtnHandler(id) {
		dispatch('itemRemove', id);
    }
    
    function addBtnHandler() {
		dispatch('triggerNewItem');
    }

</script>

<style type="text/scss">
    @import './src/styles/fonts.scss';
    @import './src/styles/vars.scss';
    @import './src/styles/mixins.scss';
    .list-item{
        @apply flex flex-row justify-around flex-wrap items-center py-4 relative;
        @media (max-width: 575px) {
            @apply justify-between;
        }
        &__inner-wrapper{
            @apply flex items-center;
            width: 35%;
            flex-basis: 35%;
            @media (max-width: 575px) {
                @apply w-full pb-5;
                flex-basis: 100%;
            }
        }
        &__name-input{
            @media (max-width: 575px) {
                width: 100%;
            }
        }
        &__name{
            @apply ml-4 relative;
            >p{
                @include regular-font;
            }
        }
        &__quantity{
            flex-basis: 10%;
            width: 10%;
            flex-grow: 0;
            flex-shrink: 0;
            @media (max-width: 575px) {
                @apply w-1/4;
                flex-basis: 25%;
            }
        }
        &__name-input input[type="text"], &__quantity input[type="number"]{
            @apply text-center;
            @include input;
            @include regular-font;
        }
        &__check{
            @apply relative;
            input[type="checkbox"]{
                @apply absolute opacity-0 h-0 w-0;
            }
            &.list-item__check--enabled{
                .list-item__checkmark{
                    background: linear-gradient(145deg, #59585f, #6a6971);
                    box-shadow: 6px 4px 23px $boxShadowDark, -6px -4px 23px $boxShadowLight;
                    transition: all 0.2s ease-in-out;
                    &:after{
                        @apply absolute block w-3 h-3 top-1/2 left-1/2 rounded-full;
                        content: "";
                        transform: translate(-50%, -50%);
                        background-color: $highlightColor;
                        transition: all .25s ease;
                    }
                }
            }
        }
        &__checkmark{
            @apply h-8 w-8 rounded-full bg-gray;
            @include flat-box-shadow;
        }
        &__dropdown{
            @apply w-1/5;
            flex-basis: 20%;
            flex-grow: 0;
            flex-shrink: 0;
            @media (max-width: 575px) {
                @apply w-2/5;
                flex-basis: 40%;
            }
        }
        &__remove, &__add{
            flex-basis: auto;
            width: auto;
            flex-grow: 0;
            flex-shrink: 0;
            button{
                @apply flex justify-center items-center border-none rounded-full outline-none;
                width: 40px;
                height: 40px;
                @include flat-box-shadow;
            }
        }
    }
</style>

<div class="list-item">
    <div class="list-item__inner-wrapper">
        {#if editable}
            <div class="list-item__name-input">
                <input type="text" name="name-input" bind:value={text}/>
            </div>
        {:else}
            <label class="list-item__check" for={`checkbox-${id}`} class:list-item__check--enabled={enabled}>
                <div class="list-item__checkmark" on:click={checkboxHandler}></div>
                <input type="checkbox" name={`checkbox-${id}`} bind:checked={enabled}>
            </label>
            <div class="list-item__name">
                <p>{text}</p>
            </div>
        {/if}
    </div>
        
    <div class="list-item__quantity">
        <input type="number" name={`quantity-${id}`} bind:value={quantity}/>
    </div>
    <div class="list-item__dropdown">
        <Dropdown dropdownData={$productMeasure} bind:selectedValue={measure}/>
    </div>
    {#if editable}
        <div class="list-item__add">
            <button on:click="{addBtnHandler}"><AddIcon/></button>
        </div>
    {:else}
        <div class="list-item__remove">
            <button on:click="{() => removeBtnHandler(id)}"><CrossIcon/></button>
        </div>
    {/if}
</div>