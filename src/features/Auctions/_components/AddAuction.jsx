import { useContext, useRef, useState } from "react";
import LoadingSpinner from "../../../components/globals/loadingSpinner";
import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";
import Modal from "../../../components/ui/Modal";
import { useCreateAuction } from "../../../hooks/useCreateAuction";
import useModalContext from "../../../hooks/useModalContext";
import { uploadImage } from "../../../services/imageUpload";
import { CreativeCommons, Plus } from "lucide-react";


function AddAuction() {

  const {mutate:createAuction, isLoading} = useCreateAuction();

  return (
    <Modal>
      <Modal.Open>
        <Button className="px-4 py-2 btn-primary text-white rounded-lg shadow-md">
          <Plus />Create Auction
        </Button>
      </Modal.Open>

      <Modal.Window>
        {isLoading? <LoadingSpinner /> : <AuctionForm createAuction = {createAuction}/>}
      </Modal.Window>
    </Modal>
  );
}

function AuctionForm({createAuction}){
  const {setOpen} = useModalContext();
  const [isError, setError] = useState("");
  const fileRef = useRef();

  async function handleSubmit(data){
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    const now = new Date();
    
    if (startTime < now) {
      setError("Start time cannot be in the past");
      return false;
    }
    
    if (endTime <= startTime) {
      setError("End time must be after start time");
      return false;
    }
    
    setError("");
    try {
      const file = data["file"];

      if (!file) {
        setError("No file selected");
        return;
      }

      console.log("file: ",file)
      const imageUrl = await uploadImage(file)
      data.picture = imageUrl;
      delete data.file;
      console.log("data: ",data);
      await createAuction(data);
      return true;
    } catch (error) {
      setError("Failed to create auction.");
      return false;
    }
  }
  
  return (
    <>
      <Modal.Close>
        <Button className="fixed w-1/6 absolute top-0 right-0 text-gray-500 hover:text-red-500 font-bold text-lg">
          ✕
        </Button>
      </Modal.Close>
      <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">New Auction</h2>

        <Form onSubmit={async (data) => {
            const result = await handleSubmit(data)
            if(result===true) setTimeout(setOpen(false), 300)} }>
          
          <Form.Field>
            <Form.Label>Name</Form.Label>
            <Form.Input
              name="itemName"
              placeholder="Name"
              minLength={10}
              maxLength={100}
              required
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>Description</Form.Label>
            <Form.Textarea
              name="description"
              placeholder="description"
              minLength={30}
              maxLength={1000}
              required
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Field>
          
          <Form.Field>
            <Form.Label>base price</Form.Label>
            <Form.Input
              name="startingPrice"
              placeholder="price ₹"
              type="number"
              min="0"
              required
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
          </Form.Field>

          <Form.Field>
            <Form.Label>Category</Form.Label>
            <Form.Input 
            name="category"
            required
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Product Picture
            </Form.Label>
            <Form.File name="file" />
          </Form.Field>
          
          <Form.Field>
            <Form.Label>Starting Date</Form.Label>
            <Form.DateTime name="startTime" required />
          </Form.Field>

          <Form.Field>
            <Form.Label>Ending Date</Form.Label>
            <Form.DateTime name="endTime" required />
          </Form.Field>

          <div className="flex justify-center items-center mt-4">
            <Form.Button className="px-4 py-2 btn-primary text-white rounded-md hover:bg-indigo-700">
              Submit
            </Form.Button>
          </div>
        </Form>
      </div>
      {isError!=="" && (
        <div className="text-red-600 text-sm mt-2 text-center">
          {isError}
        </div>
      )}
    </>
  )
}

export default AddAuction;
