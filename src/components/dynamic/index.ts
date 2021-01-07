import { dynamic } from 'umi';
import React, { memo, useMemo, useContext, FC } from 'react'

const DynamicFunc = (componentName: string) => {
  return dynamic({
    loader: async function() {
      let Component: FC<>;
      const G = await import(
        `components/componentList/${componentName}`
      )
      Component = G
      return (props: DynamicType) => {
        const { propsConfig } = props
        return <Component {...propsConfig} />
      }
    },
    loading: () => (
      <div>Loading</div>
    ),
  })
}

export const DynamicEngine = memo((props: DynamicType) => {
  const { componentName, propsConfig } = props;
  const Dynamic = useMemo(() => {
    return (DynamicFunc(componentName)) as FC<DynamicType>;
  }, [componentName, propsConfig]);

  return <Dynamic {...props} />;
});

export type DynamicType = {
  propsConfig: { [key: string]: any };
  componentName: string;
};