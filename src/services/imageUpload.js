import { supabase } from "./supabase";


export const uploadImage = async (file)=>{
    const filePath = `auctions/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from(process.env.REACT_APP_BUCKET_NAME)
        .upload(filePath, file);

    if(error) throw error;

    const { data: publicUrl } = supabase.storage
        .from(process.env.REACT_APP_BUCKET_NAME)
        .getPublicUrl(filePath);

    return publicUrl.publicUrl;
}