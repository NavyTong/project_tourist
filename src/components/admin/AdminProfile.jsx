import { useEffect, useState } from "react";
import styles from "./AdminProfile.module.css";

export default function AdminProfile() {
  const [user, setUser] = useState(null);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  
  // Edit Profile form state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editImage, setEditImage] = useState("");
  
  // Security Settings form state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securitySuccess, setSecuritySuccess] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setEditName(parsedUser.name || "");
      setEditEmail(parsedUser.email || "");
      setEditImage(parsedUser.profileImage || "");
    }
  }, []);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name: editName, email: editEmail, profileImage: editImage };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditModalOpen(false);
  };

  const handleSaveSecurity = () => {
    if (newPassword && newPassword === confirmPassword) {
      const updatedUser = { ...user, password: newPassword };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSecuritySuccess("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setSecuritySuccess("");
        setIsSecurityModalOpen(false);
      }, 2000);
    } else {
      alert("Passwords do not match or are empty!");
    }
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileLayout}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.avatarContainer}>
            <img 
              src={user.profileImage || "/avatar.png"} 
              alt="Admin Profile" 
              className={styles.avatarImage}
            />
          </div>
          <h2 className={styles.adminName}>{user.name}</h2>
          <p className={styles.adminRole}>System Administrator</p>
          
          <div className={styles.buttonGroup}>
            <button 
              className={styles.buttonPrimary} 
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Admin Data
            </button>
            <button 
              className={styles.buttonSecondary} 
              onClick={() => setIsSecurityModalOpen(true)}
            >
              Security Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1 className={styles.title}>Account Overview</h1>
            <p className={styles.subtitle}>Manage the administrative details for your system account</p>
          </header>

          <div className={styles.grid}>
            <div className={styles.infoSection}>
               <InfoField label="Administrative Name" value={user.name} />
               <InfoField label="System Email" value={user.email} />
               <InfoField label="Access Level" value="Super Admin" />
            </div>
            
            <div className={styles.statsCard}>
               <h3 className={styles.statsCardTitle}>Activity Stats</h3>
               <div className={styles.statsGrid}>
                  <StatItem count={user.stats?.trips || 0} label="Trips Tracked" />
                  <StatItem count={user.stats?.reviews || 0} label="Reviews Moderated" />
                  <StatItem count={12} label="Daily Tasks" />
                  <StatItem count="Live" label="System Status" />
               </div>
            </div>
          </div>

          <div className={styles.logsSection}>
            <div className={styles.logsInfo}>
               <h4 className={styles.logsTitle}>System Logs</h4>
               <p className={styles.logsDesc}>Review the last 24 hours of administrative activity.</p>
            </div>
            <button className={styles.logsButton}>
               View Logs
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Edit Admin Data</h3>
              <button className={styles.closeButton} onClick={() => setIsEditModalOpen(false)}>&times;</button>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Name</label>
              <input 
                type="text" 
                className={styles.inputField} 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input 
                type="email" 
                className={styles.inputField} 
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)} 
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Profile Image URL</label>
              <input 
                type="text" 
                className={styles.inputField} 
                value={editImage} 
                onChange={(e) => setEditImage(e.target.value)} 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className={styles.saveButton} onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Modal */}
      {isSecurityModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Security Settings</h3>
              <button className={styles.closeButton} onClick={() => setIsSecurityModalOpen(false)}>&times;</button>
            </div>
            {securitySuccess && <div className={styles.successMessage}>{securitySuccess}</div>}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>New Password</label>
              <input 
                type="password" 
                className={styles.inputField} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Confirm New Password</label>
              <input 
                type="password" 
                className={styles.inputField} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setIsSecurityModalOpen(false)}>Cancel</button>
              <button className={styles.saveButton} onClick={handleSaveSecurity}>Update Password</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className={styles.infoField}>
      <label className={styles.infoLabel}>{label}</label>
      <div className={styles.infoValue}>
        {value}
      </div>
    </div>
  );
}

function StatItem({ count, label }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statCount}>{count}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
