from Loader import SignalLoader
from flask import jsonify, Response,request,Blueprint
import time,json

ecg=Blueprint('ecg',__name__)

# loader = SignalLoader("data/ecg_with_time.csv")
# loader.load_data()


#___________________________________________________________________________________
@ecg.route('/upload_data', methods=['POST'])
def upload_data():
    global loader
    file = request.files['file'] 
    loader = SignalLoader(file)
    loader.load_data()
#_______________________________________________________________________________


def ecg_stream_generator(selected_leads, chunk_size=500, delay=0.5):
    start = 0
    total = len(loader.df)
    while start < total:
        chunk = loader.get_chunk(start_idx=start, chunk_size=chunk_size, leads=selected_leads)
        yield f"data: {json.dumps(chunk)}\n\n"
        time.sleep(delay)
        start += chunk_size
#___________________________________________________________________________________
#this is for view graphs option
@ecg.route('/ecg_stream')
def ecg_stream():
    all_leads = loader.get_leads()
    selected_leads = all_leads[:3]  # default 3 leads
    return Response(ecg_stream_generator(selected_leads), mimetype='text/event-stream')
#___________________________________________________________________________________
# this is for leads option
@ecg.route("/ecg_stream_leads/<int:num_leads>")
def ecg_stream_leads(num_leads):
    all_leads = loader.get_leads()
    selected_leads = all_leads[:num_leads]
    return Response(ecg_stream_generator(selected_leads), mimetype='text/event-stream')
#___________________________________________________________________________________



# ai_predictor = AiPredictor("path/to/pretrained_model.pth")

# @ecg.route("/predict", methods=["POST"])
# def predict():
#     global loader
#     if loader.df is None:
#         return jsonify({"error": "No ECG data uploaded"}), 400

#     # leads optional
#     leads = request.form.getlist("leads")  # frontend يقدر يبعت ['Lead I', 'Lead II', ...]
#     preds = ai_predictor.predict_df(loader.df, leads=leads if leads else None)
    
#     return jsonify({"predictions": preds})
