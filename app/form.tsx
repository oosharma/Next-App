import { useEffect, useState } from "react";

interface FormProps {
  setShowImg: React.Dispatch<React.SetStateAction<boolean>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  fileName: string;
}

export default function Form({ setShowImg, setFileName, fileName }: FormProps) {
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    bed: "",
    bath: "",
    builtUp: "",
    lotSize: "",
  });

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   setShowImg(false);
  //   event.preventDefault();
  //   // Handle form submission here
  //   console.log("here");
  //   const queryParams = new URLSearchParams(formData).toString();

  //   const updatedFileName = `output${Date.now()}.png`;
  //   setFileName(updatedFileName);
  //   const res = await fetch(
  //     `/api/hello?${queryParams}&fileName=${updatedFileName}`,
  //     {
  //       cache: "no-cache",
  //     }
  //   ).then((res) => setShowImg(true));
  // };  const [imageSrc, setImageSrc] = useState<null | string>(null);
  const [imageSrc, setImageSrc] = useState<null | string>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(`/api/hello?${queryParams}`); // Replace this with your API endpoint URL
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
    // fetchImage();
  };
  useEffect(() => {
    // async function fetchImage() {
    //   try {
    //     const response = await fetch("http://localhost:3000/api/hello"); // Replace this with your API endpoint URL
    //     const blob = await response.blob();
    //     const objectURL = URL.createObjectURL(blob);
    //     setImageSrc(objectURL);
    //   } catch (error) {
    //     console.error("Failed to fetch image:", error);
    //   }
    // }
    // fetchImage();
  }, []);
  async function fetchImage() {
    try {
      const response = await fetch("http://localhost:3000/api/hello"); // Replace this with your API endpoint URL
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageSrc(objectURL);
    } catch (error) {
      console.error("Failed to fetch image:", error);
    }
  }
  const handleChange = (event: any) => {
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

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="bed">Bed:</label>
        <select
          id="bed"
          name="bed"
          value={formData.bed}
          onChange={handleChange}
        >
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label htmlFor="bath">Bath:</label>
        <select
          id="bath"
          name="bath"
          value={formData.bath}
          onChange={handleChange}
        >
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label htmlFor="builtUp">Built Up:</label>
        <input
          id="builtUp"
          name="builtUp"
          type="builtUp"
          value={formData.builtUp}
          onChange={handleChange}
        />
        <label htmlFor="lotSize">Lot Size:</label>
        <input
          id="lotSize"
          name="lotSize"
          type="lotSize"
          value={formData.lotSize}
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
      <div>
        {imageSrc ? <img src={imageSrc} alt="Generated content" /> : <p> </p>}
      </div>
    </>
  );
}
