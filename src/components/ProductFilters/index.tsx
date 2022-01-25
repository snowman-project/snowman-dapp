import { useState } from 'react';

import { Picker } from 'antd-mobile';
import { DownFill } from 'antd-mobile-icons';
import { PickerColumn } from 'antd-mobile/es/components/picker-view';

import styles from './index.module.less';

export {
  PickerColumn,
  PickerColumnItem,
} from 'antd-mobile/es/components/picker-view';

export interface ProductFiltersProps {
  children: React.ReactElement<ProductFilterProps>[];
}

export function ProductFilters({ children }: ProductFiltersProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const columns = children.map((child) => child.props.options);
  return (
    <>
      <div className={styles.container} onClick={() => setPickerVisible(true)}>
        {children}
      </div>
      <Picker
        columns={columns}
        visible={pickerVisible}
        confirmText="筛选"
        onClose={() => setPickerVisible(false)}
      />
    </>
  );
}

export interface ProductFilterProps {
  name: string;
  options: PickerColumn;
}

export function ProductFilter({ name }: ProductFilterProps) {
  return (
    <div className={styles.filter}>
      <span className={styles.filterName}>{name}</span>
      <DownFill fontSize="0.66rem" />
    </div>
  );
}
