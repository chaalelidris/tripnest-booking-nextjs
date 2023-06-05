'use client';

import useWilayas from '@/hooks/useWilayas';
import Select from 'react-select';



export type WilayaSelectValue = {
  id: string;
  label: string;
  value: string;
  latitude: number;
  longitude: number
}

interface WilayaSelectProps {
  value?: WilayaSelectValue;
  onChange: (value: WilayaSelectValue) => void;
}

const WilayaSelect: React.FC<WilayaSelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useWilayas();

  return (
    <div>
      <Select
        placeholder="Select a wilaya"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as WilayaSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>{option.id}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.value}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />

    </div>
  );
};



export default WilayaSelect;
