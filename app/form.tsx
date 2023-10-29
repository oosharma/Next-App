import { useState } from "react";

interface FormProps {
  setShowImg: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
}

export default function Form({ setShowImg, setFileName, fileName }: FormProps) {
  const [formData, setFormData] = useState({
    address: "",
    priceBedBath: "",
    builtUpLotSize: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setShowImg(false);
    event.preventDefault();
    // Handle form submission here
    console.log("here");
    const queryParams = new URLSearchParams(formData).toString();

    const updatedFileName = `output${Date.now()}.png`;
    setFileName(updatedFileName);
    const res = await fetch(
      `/api/hello?${queryParams}&fileName=${updatedFileName}`,
      {
        cache: "no-cache",
      }
    ).then((res) => setShowImg(true));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <br />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          color: "red",
        }}
      >
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="priceBedBath">PriceBedBath:</label>
        <input
          id="priceBedBath"
          name="priceBedBath"
          type="text"
          value={formData.priceBedBath}
          onChange={handleChange}
        />

        <label htmlFor="builtUpLotSize">BuiltUpLotSize:</label>
        <input
          id="builtUpLotSize"
          name="builtUpLotSize"
          type="builtUpLotSize"
          value={formData.builtUpLotSize}
          onChange={handleChange}
        />

        <button type="submit" style={{ border: "solid 1px red" }}>
          Submit
        </button>
        {/* <button type="button" onClick={() => setShowImg(true)}>
        Show Image
      </button> */}
      </form>
      <br />
    </>
  );
}
