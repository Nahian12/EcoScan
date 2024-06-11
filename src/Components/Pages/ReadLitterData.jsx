import supabase from '../../supabase';

export const readLitterData = async () => {
  const { data: litter, error } = await supabase
    .from('litter')
    .select('*');
    
  if (error) {
    console.error('Error fetching litter data:', error);
    return [];
  } else {
    console.log(litter)
    return litter;
  }
};
