export type TSDMResponse = {
  uid: string;
  enc_mode: string;
  read_ctr: number;
  file_data?: string | null;
  tt_status?: string;
};
