<script>
    // your script goes here
    import { productMeasure } from '../globals.js';
    export let text;
    export let id;
    export let enabled = false;
    export let measure;
    
    function checkboxHandler() {
        enabled = !enabled;
    }
    
</script>

<style type="text/scss">
@import './src/styles/vars.scss';
    /* your styles go here */
    .list-item{
        @apply flex flex-row justify-around flex-wrap items-center py-4 relative;
        &__inner-wrapper{
            @apply flex items-center;
        }
        &__name{
            @apply ml-2 relative;
        }
        &__check{
            @apply relative;
            input[type="checkbox"]{
                @apply absolute opacity-0 h-0 w-0;
            }
            &.list-item__check--enabled{
                .list-item__checkmark{
                    background: linear-gradient(145deg, #a9e3d2, #c9fff9);
                    box-shadow: 13px 13px 27px $boxShadowDark, -13px -13px 27px $boxShadowLight;
                    transition: all 0.2s ease-in-out;
                    &:after{
                        @apply absolute block w-4 h-4 top-1/2 left-1/2 rounded-full;
                        content: "";
                        transform: translate(-50%, -50%);
                        background: linear-gradient(145deg, #51ff11, #44e60e);
                        transition: all .25s ease;
                    }
                }
            }
        }
        &__checkmark{
            @apply h-8 w-8 rounded-full bg-mint;
            box-shadow: 5px 5px 10px $boxShadowDark, -5px -5px 10px $boxShadowLight, inset 0px 0px 4px rgba(255, 255, 255, .2), inset 5px 5px 10px rgba(55, 84, 170, 0), inset -5px -5px 10px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0)
        }
        &__quantity input[type="number"]{
            @apply bg-white outline-none border-none rounded-full py-2 px-4 block w-full appearance-none leading-normal;
            background-color: $mainColor;
            box-shadow: inset 5px 5px 10px $boxShadowDark, inset -5px -5px 10px $boxShadowLight;
            transition: all 0.2s ease-in-out;
            &:focus {
                box-shadow:  inset 1px 1px 2px $boxShadowDark, inset -1px -1px 2px $boxShadowLight;
            }
        }
    }
</style>

<!-- markup (zero or more items) goes here -->
<div class="list-item">
    <div class="list-item__inner-wrapper">
        <label class="list-item__check" for={`checkbox-${id}`} class:list-item__check--enabled={enabled}>
            <div class="list-item__checkmark" on:click={checkboxHandler}></div>
            <input type="checkbox" name={`checkbox-${id}`} bind:checked={enabled}>
        </label>
        <div class="list-item__name">
            <p>{text}</p>
        </div>
    </div>

    <div class="list-item__quantity">
        <input type="number" name={`quantity-${id}`}/>
    </div>
    <div class="list-item__measure">
        <select bind:value={measure}>
            {#each $productMeasure as {name}}
                <option value={name}>
                    {name}
                </option>
            {/each}
        </select>
    </div>
</div>