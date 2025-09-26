import pandas as pd

class SignalLoader:
    def __init__(self, filepath):
        self.filepath = filepath
        self.df = None

    def load_data(self):
        self.df = pd.read_csv(self.filepath)
        return self.df

    def get_leads(self):
        if self.df is None:
            self.load_data()
        return [col for col in self.df.columns if col != "time"]

    def to_dict(self):
        if self.df is None:
            self.load_data()
        data = {"time": self.df["time"].tolist()}
        for lead in self.get_leads():
            data[lead] = self.df[lead].tolist()
        return data
    

    def get_subleads(self, leads):
        data = {"time": self.df["time"].tolist()}
        for lead in leads:
            if lead in self.df.columns:
                data[lead] = self.df[lead].tolist()
        return data
    

    def get_chunk(self, start_idx=0, chunk_size=500, leads=None):
        """
        start_idx : بداية الشريحة (index)
        chunk_size: عدد النقاط اللي عايز ترجعها
        leads     : قائمة الأعمدة اللي عايز ترجعها (لو None = كل leads)
        """
        if self.df is None:
            self.load_data()

        end_idx = start_idx + chunk_size
        chunk_df = self.df.iloc[start_idx:end_idx]

        # اختاري leads أو كل الأعمدة اللي عندنا
        if leads is None:
            leads = self.get_leads()

        chunk = {"time": chunk_df["time"].tolist()}
        for lead in leads:
            if lead in chunk_df.columns:
                chunk[lead] = chunk_df[lead].tolist()

        return chunk