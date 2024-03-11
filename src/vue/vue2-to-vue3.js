
useCssModule

    const emit = defineEmits<{
        (event: "update:modelValue", newvalue: string): void;
    }>();

    const modelval = ref<string | number>("");

    interface Props {
        label?: string;
        modelValue?: string | number;
        inputAttrs?: any;
        fieldAttrs?: any;
    }

    const props = withDefaults(defineProps<Props>(), {
        label: "Label",
        modelValue: "sdf",
        inputAttrs: {},
        fieldAttrs: {},
    });

    watch(
        () => props.modelValue,
        (ne, ol) => {
            modelval.value = ne;
        }
    );
    
    
    inject("userEmail");
    provide("userEmail", userStore.getEmail);
    let style = useCssModule()
    
    ==========================
            <slot
                name="item"
                :opt="opt"
            ></slot>

                    <template #item="slotProps">
                        <div class="media">
                            <div class="media-content">
                                <p>
                                    {{ slotProps.opt.boundaryDisplayName }}
                                </p>
                            </div>
                        </div>
                    </template>
    ==========================
    
<script lang="ts" setup>
    import { computed } from 'vue'
    import { storeToRefs } from 'pinia'
</script>

<template>
    <div>Sample</div>
</template>

<style lang="scss" module>
    @import '@/scss/common.scss';
</style>
