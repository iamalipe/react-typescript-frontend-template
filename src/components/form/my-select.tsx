import * as SelectPrimitive from "@radix-ui/react-select";

const MySelect = () => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport>
            <SelectPrimitive.Item value="das">
              <SelectPrimitive.ItemText />
              dasdsadsada
              <SelectPrimitive.ItemIndicator />
            </SelectPrimitive.Item>

            <SelectPrimitive.Group>
              <SelectPrimitive.Label />
              <SelectPrimitive.Item value="da1s">
                <SelectPrimitive.ItemText />
                sads add sadas asdd sadasd
                <SelectPrimitive.ItemIndicator />
              </SelectPrimitive.Item>
            </SelectPrimitive.Group>

            <SelectPrimitive.Separator />
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
          <SelectPrimitive.Arrow />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default MySelect;
