import mongoose from "mongoose";

const candidatureSchema = mongoose.Schema(
    {
        entreprise:{
            type: String,
            minlength: 3,
            required: true
        },
        statut: {
            type: String,
            enum: ['En attente', 'Accepté', 'Refusé'], //accepte slmt les reposo
            required: true
        },
        poste: {
            type: String,
            required: true
        },
        lienOffre: {
            type: String,
            required: true,
          },
        dateEnvoi: {
            type: Date,
            required: true
        },
        dateRelance:{
            type: Date,
            required: true
        }


    },{
        Timestamp: true
    }
)

export default mongoose.model('candidature', candidatureSchema)