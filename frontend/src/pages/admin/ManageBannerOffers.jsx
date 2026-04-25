import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  AlertCircle,
  Check,
  X,
  Megaphone,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import SectionContainer from "../../components/SectionContainer";

export default function ManageBannerOffers() {
  const { user, token, logout, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    text: "",
    active: true,
  });

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: "/login" });
    }
  }, [isAdmin, authLoading, navigate]);

  // Fetch offers
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tealeafluxe.onrender.com/api/banner-offers/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (err) {
      setError("Failed to load banner offers");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.text) {
      setError("Text is required!");
      return;
    }

    try {
      const method = editingOffer ? "PUT" : "POST";
      const url = editingOffer
        ? `https://tealeafluxe.onrender.com/api/banner-offers/${editingOffer._id}`
        : "https://tealeafluxe.onrender.com/api/banner-offers";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save offer");
      }

      if (editingOffer) {
        setOffers(offers.map((o) => (o._id === data.offer._id ? data.offer : o)));
        setSuccess("Offer updated successfully!");
      } else {
        setOffers([...offers, data.offer]);
        setSuccess("Offer added successfully!");
      }

      setTimeout(() => {
        resetForm();
        setShowModal(false);
        setEditingOffer(null);
      }, 500);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) {
      return;
    }

    try {
      const response = await fetch(`https://tealeafluxe.onrender.com/api/banner-offers/${offerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete offer");
      }

      setOffers(offers.filter((o) => o._id !== offerId));
      setSuccess("Offer deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      text: offer.text,
      active: offer.active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      text: "",
      active: true,
    });
    setError("");
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <SectionContainer>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-semibold text-foreground flex items-center gap-3">
              <Megaphone className="text-primary" size={32} />
              Manage Banner Offers
            </h1>
            <p className="text-foreground/60 mt-2">Edit your promotional banner texts</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-smooth"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>

        {/* Admin Navigation */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 border-b border-border">
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-smooth font-medium whitespace-nowrap"
          >
            Products
          </Link>
          <Link
            to="/admin/hero-slides"
            className="px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-smooth font-medium whitespace-nowrap"
          >
            Hero Slides
          </Link>
          <Link
            to="/admin/banner-offers"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium whitespace-nowrap"
          >
            Banner Offers
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-smooth font-medium whitespace-nowrap"
          >
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className="px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-smooth font-medium whitespace-nowrap"
          >
            Customers
          </Link>
          <Link
            to="/admin/stats"
            className="px-4 py-2 rounded-lg bg-muted/50 text-foreground hover:bg-muted transition-smooth font-medium whitespace-nowrap"
          >
            Stats
          </Link>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/30 flex items-center gap-3"
            >
              <Check className="text-accent" size={20} />
              <p className="text-accent font-medium">{success}</p>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
            >
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-red-600 font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Offer Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingOffer(null);
            resetForm();
            setShowModal(true);
          }}
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-smooth"
        >
          <Plus size={20} />
          Add New Offer
        </motion.button>

        {/* Offers Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-foreground/60">Loading offers...</p>
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-foreground/60">No offers found</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {offers.map((offer) => (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow relative"
              >
                {!offer.active && (
                  <span className="absolute top-4 right-4 text-xs bg-yellow-500/20 text-yellow-700 px-2 py-1 rounded">
                    Inactive
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-xl font-semibold text-primary mb-1">
                    {offer.text}
                  </p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-smooth text-foreground/70 hover:text-primary border border-border/50"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-smooth text-foreground/70 hover:text-red-600 border border-border/50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-lg w-full max-w-md overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-card border-b border-border p-6 flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {editingOffer ? "Edit Offer" : "Add New Offer"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-muted transition-smooth"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Text */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Banner Text (e.g., "🎉 Flat 10% off on all orders") *
                    </label>
                    <textarea
                      name="text"
                      value={formData.text}
                      onChange={handleInputChange}
                      placeholder="🎉 Flat 10% off on all orders"
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                      className="rounded border-border cursor-pointer"
                    />
                    <label htmlFor="active" className="text-sm font-medium text-foreground cursor-pointer">
                      Active (Show on banner)
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                      <AlertCircle className="text-red-500" size={18} />
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-6 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-smooth"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-smooth"
                    >
                      {editingOffer ? "Update" : "Add"} Offer
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionContainer>
    </div>
  );
}
