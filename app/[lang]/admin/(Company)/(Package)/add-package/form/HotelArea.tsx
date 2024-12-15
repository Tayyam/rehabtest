import React, { useEffect, useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import { FormikProps } from "formik";
import {
  useGetAreaQuery,
  useGetHotelByAreaIdQuery,
  useGetContractByHotelIdQuery,
} from "@/redux/features/api/company/package";
import { formatDate } from "@/utils/formatDate";

interface HotelAreaProps {
  areaNumber: number;
  formikProps: FormikProps<any>;
}

export const HotelArea: React.FC<HotelAreaProps> = ({
  areaNumber,
  formikProps,
}) => {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null
  );
  const [selectedContractDate, setSelectedContractDate] = useState({
    start_date: "",
    end_date: "",
  });
  const { data: area } = useGetAreaQuery({});
  const { data: hotels } = useGetHotelByAreaIdQuery(
    { id: selectedAreaId || "" },
    { skip: !selectedAreaId }
  );
  const { data: contracts } = useGetContractByHotelIdQuery(
    { id: selectedHotelId || "" },
    { skip: !selectedHotelId }
  );

  const areaOptions =
    area?.data?.map((item: any) => ({
      id: item.location_id,
      name: item.name,
    })) || [];

  const hotelsOptions =
    hotels?.data?.map((item: any) => ({
      id: item.hotel_id,
      name: item.hotel.name,
    })) || [];

  const contractsOptions =
    contracts?.data?.map((item: any) => ({
      id: item.id,
      name: `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`,
      start_date: item.start_date,
      end_date: item.end_date,
    })) || [];

  useEffect(() => {
    if (selectedAreaId) {
      formikProps.setFieldValue(`hotel_name_${areaNumber}`, "");
      formikProps.setFieldValue(`contract_id_${areaNumber}`, "");
      setSelectedHotelId(null);
      setSelectedContractId(null);
    }
  }, [selectedAreaId]);

  useEffect(() => {
    if (selectedHotelId) {
      formikProps.setFieldValue(`contract_id_${areaNumber}`, "");
      setSelectedContractId(null);
    }
  }, [selectedHotelId]);

  useEffect(() => {
    if (selectedContractDate) {
      formikProps.setFieldValue(
        `hotel_contract_${areaNumber}_start_date`,
        selectedContractDate.start_date
      );
      formikProps.setFieldValue(
        `hotel_contract_${areaNumber}_end_date`,
        selectedContractDate.end_date
      );
    }
  }, [selectedContractDate]);

  useEffect(() => {
    const calculatePilgrims = () => {
      const roomTypes = ["double", "triple", "quadruple"];
      const totalPilgrims = roomTypes.reduce((total, type) => {
        const roomCount =
          formikProps.values[`hotel_contract_${areaNumber}_${type}_rooms`] || 0;
        let pilgrimsPerRoom = 0;

        if (type === "double") pilgrimsPerRoom = roomCount * 2;
        else if (type === "triple") pilgrimsPerRoom = roomCount * 3;
        else if (type === "quadruple") pilgrimsPerRoom = roomCount * 4;

        return total + pilgrimsPerRoom;
      }, 0);

      formikProps.setFieldValue(
        `hotel_contract_${areaNumber}_pilgrims`,
        totalPilgrims
      );
    };

    calculatePilgrims();
  }, [
    formikProps.values[`hotel_contract_${areaNumber}_double_rooms`],
    formikProps.values[`hotel_contract_${areaNumber}_triple_rooms`],
    formikProps.values[`hotel_contract_${areaNumber}_quadruple_rooms`],
  ]);

  return (
    <div className="p-[15px] flex flex-col gap-5 rounded-[10px] border border-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CustomMultiSelect
          placeholder="Select"
          title={`Hotel Area ${areaNumber}`}
          data={areaOptions}
          formik={formikProps}
          name={`hotel_area_${areaNumber}`}
          value={formikProps.values[`hotel_area_${areaNumber}`]}
          isMultiSelect={false}
          onChange={(value) => {
            formikProps.setFieldValue(`hotel_area_${areaNumber}`, value);
            setSelectedAreaId(value.value);
          }}
        />

        <CustomMultiSelect
          placeholder="Select"
          title={`Hotel Name ${areaNumber}`}
          data={hotelsOptions}
          formik={formikProps}
          name={`hotel_name_${areaNumber}`}
          value={formikProps.values[`hotel_name_${areaNumber}`]}
          isMultiSelect={false}
          onChange={(value) => {
            formikProps.setFieldValue(`hotel_name_${areaNumber}`, value);
            setSelectedHotelId(value.value);
          }}
        />

        <CustomMultiSelect
          placeholder="Select"
          title={`Hotel Contract ${areaNumber}`}
          data={contractsOptions}
          formik={formikProps}
          name={`contract_id_${areaNumber}`}
          value={formikProps.values[`contract_id_${areaNumber}`]}
          isMultiSelect={false}
          onChange={(value) => {
            formikProps.setFieldValue(`contract_id_${areaNumber}`, value);
            setSelectedContractDate(
              contractsOptions.find((item: any) => item.id == value.value)
            );
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CustomInput
          type="date"
          name={`hotel_contract_${areaNumber}_start_date`}
          placeholder="Start Date"
          title="Start Date"
          value={formikProps.values[`hotel_contract_${areaNumber}_start_date`]}
          min={selectedContractDate?.start_date}
          max={selectedContractDate?.end_date}
          disabled={!selectedContractDate}
        />
        <CustomInput
          type="date"
          name={`hotel_contract_${areaNumber}_end_date`}
          placeholder="End Date"
          title="End Date"
          value={formikProps.values[`hotel_contract_${areaNumber}_end_date`]}
          min={selectedContractDate?.start_date}
          max={selectedContractDate?.end_date}
          disabled={!selectedContractDate}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { type: "double", title: "Double Rooms" },
          { type: "triple", title: "Triple Rooms" },
          { type: "quadruple", title: "Quadruple Rooms" },
        ].map(({ type, title }) => (
          <CustomInput
            key={type}
            type="number"
            name={`hotel_contract_${areaNumber}_${type}_rooms`}
            placeholder="0"
            title={title}
            value={
              formikProps.values[`hotel_contract_${areaNumber}_${type}_rooms`]
            }
          />
        ))}

        <CustomInput
          type="number"
          name={`hotel_contract_${areaNumber}_pilgrims`}
          placeholder="0"
          title="Pilgrims"
          value={formikProps.values[`hotel_contract_${areaNumber}_pilgrims`]}
          className="bg-[#999eb2d5] text-black"
          disabled
        />
      </div>
    </div>
  );
};
